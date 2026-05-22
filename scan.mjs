#!/usr/bin/env node

/**
 * scan.mjs — Zero-token portal scanner
 *
 * Fetches Greenhouse, Ashby, and Lever APIs directly, applies title
 * filters from portals.yml, deduplicates against existing history,
 * and appends new offers to pipeline.md + scan-history.tsv.
 *
 * Zero Claude API tokens — pure HTTP + JSON.
 *
 * Usage:
 *   node scan.mjs                  # scan all enabled companies
 *   node scan.mjs --dry-run        # preview without writing files
 *   node scan.mjs --company Cohere # scan a single company
 *   node scan.mjs --verbose        # also print each skipped duplicate + its source
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import yaml from 'js-yaml';
const parseYaml = yaml.load;

// ── Config ──────────────────────────────────────────────────────────

const PORTALS_PATH = 'portals.yml';
const SCAN_HISTORY_PATH = 'data/scan-history.tsv';
const PIPELINE_PATH = 'data/pipeline.md';
const APPLICATIONS_PATH = 'data/applications.md';

// Ensure required directories exist (fresh setup)
mkdirSync('data', { recursive: true });

const CONCURRENCY = 10;
const FETCH_TIMEOUT_MS = 10_000;

// ── API detection ───────────────────────────────────────────────────

function detectApi(company) {
  // Greenhouse: explicit api field
  if (company.api && company.api.includes('greenhouse')) {
    return { type: 'greenhouse', url: company.api };
  }

  const url = company.careers_url || '';

  // Ashby
  const ashbyMatch = url.match(/jobs\.ashbyhq\.com\/([^/?#]+)/);
  if (ashbyMatch) {
    return {
      type: 'ashby',
      url: `https://api.ashbyhq.com/posting-api/job-board/${ashbyMatch[1]}?includeCompensation=true`,
    };
  }

  // Lever
  const leverMatch = url.match(/jobs\.lever\.co\/([^/?#]+)/);
  if (leverMatch) {
    return {
      type: 'lever',
      url: `https://api.lever.co/v0/postings/${leverMatch[1]}`,
    };
  }

  // Recruitee — {subdomain}.recruitee.com
  const recruiteeMatch = url.match(/([^/?#.]+)\.recruitee\.com/);
  if (recruiteeMatch) {
    return {
      type: 'recruitee',
      url: `https://${recruiteeMatch[1]}.recruitee.com/api/offers/`,
    };
  }

  // SmartRecruiters — (jobs|careers).smartrecruiters.com/{CompanyId}
  const srMatch = url.match(/(?:jobs|careers)\.smartrecruiters\.com\/([^/?#]+)/);
  if (srMatch) {
    return {
      type: 'smartrecruiters',
      url: `https://api.smartrecruiters.com/v1/companies/${srMatch[1]}/postings?limit=100`,
    };
  }

  // Workable — apply.workable.com/{account}
  const workableMatch = url.match(/apply\.workable\.com\/([^/?#]+)/);
  if (workableMatch) {
    return {
      type: 'workable',
      url: `https://apply.workable.com/api/v1/widget/accounts/${workableMatch[1]}`,
    };
  }

  // Workday — {tenant}.{region}.myworkdayjobs.com/[{lang}/]{site}
  const wdMatch = url.match(/([^/?#.]+)\.(wd[0-9]+)\.myworkdayjobs\.com\/(?:[a-z]{2}-[A-Z]{2}\/)?([^/?#]+)/);
  if (wdMatch) {
    const [, tenant, region, site] = wdMatch;
    return {
      type: 'workday',
      url: `https://${tenant}.${region}.myworkdayjobs.com/wday/cxs/${tenant}/${site}/jobs`,
      siteBase: `https://${tenant}.${region}.myworkdayjobs.com/${site}`,
    };
  }

  // Greenhouse EU boards
  const ghEuMatch = url.match(/job-boards(?:\.eu)?\.greenhouse\.io\/([^/?#]+)/);
  if (ghEuMatch && !company.api) {
    return {
      type: 'greenhouse',
      url: `https://boards-api.greenhouse.io/v1/boards/${ghEuMatch[1]}/jobs`,
    };
  }

  return null;
}

// ── API parsers ─────────────────────────────────────────────────────

// Normalize an ATS-supplied timestamp to YYYY-MM-DD. The five supported
// formats ("2026-03-19T16:43:44-04:00", "2026-05-20 23:53:29 UTC",
// "2026-05-21T18:00:01.100Z", "2026-05-21", etc.) all begin with the
// ISO date, so a 10-char slice is enough.
function formatPublished(raw) {
  if (!raw || typeof raw !== 'string') return '';
  const slice = raw.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(slice) ? slice : '';
}

function parseGreenhouse(json, companyName) {
  const jobs = json.jobs || [];
  return jobs.map(j => ({
    title: j.title || '',
    url: j.absolute_url || '',
    company: companyName,
    location: j.location?.name || '',
    published: formatPublished(j.first_published),
  }));
}

function parseAshby(json, companyName) {
  const jobs = json.jobs || [];
  return jobs.map(j => ({
    title: j.title || '',
    url: j.jobUrl || '',
    company: companyName,
    location: j.location || '',
    published: formatPublished(j.publishedAt),
  }));
}

function parseLever(json, companyName) {
  if (!Array.isArray(json)) return [];
  return json.map(j => ({
    title: j.text || '',
    url: j.hostedUrl || '',
    company: companyName,
    location: j.categories?.location || '',
    published: '',
  }));
}

function parseRecruitee(json, companyName) {
  const offers = json.offers || [];
  return offers
    .filter(o => o.status === 'published')
    .map(o => ({
      title: o.title || '',
      url: o.careers_url || '',
      company: companyName,
      location: o.location || [o.city, o.country].filter(Boolean).join(', '),
      published: formatPublished(o.published_at),
    }));
}

function parseSmartRecruiters(json, companyName) {
  const content = json.content || [];
  return content.map(p => ({
    title: p.name || '',
    url: p.company?.identifier
      ? `https://jobs.smartrecruiters.com/${p.company.identifier}/${p.id}`
      : '',
    company: companyName,
    location: p.location?.fullLocation
      || [p.location?.city, p.location?.region, p.location?.country].filter(Boolean).join(', '),
    published: formatPublished(p.releasedDate),
  }));
}

function parseWorkable(json, companyName) {
  const jobs = json.jobs || [];
  return jobs.map(j => ({
    title: j.title || '',
    url: j.shortlink || j.url || '',
    company: companyName,
    location: [j.city, j.state, j.country].filter(Boolean).join(', '),
    published: formatPublished(j.published_on),
  }));
}

function parseWorkday(json, companyName, api) {
  const jobs = json.jobPostings || [];
  return jobs.map(j => ({
    title: j.title || '',
    url: j.externalPath ? `${api.siteBase}${j.externalPath}` : '',
    company: companyName,
    location: j.locationsText || '',
    published: '',
  }));
}

const PARSERS = {
  greenhouse: parseGreenhouse,
  ashby: parseAshby,
  lever: parseLever,
  recruitee: parseRecruitee,
  smartrecruiters: parseSmartRecruiters,
  workable: parseWorkable,
  workday: parseWorkday,
};

// ── Fetch with timeout ──────────────────────────────────────────────

async function fetchJson(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchApi(api) {
  // Workday: POST + paginate (max 20/page). Only the first response reports
  // a non-zero `total`; subsequent pages return 0, so we lock total once and
  // also stop when a short page is returned.
  if (api.type === 'workday') {
    const limit = 20;
    const aggregated = [];
    let offset = 0;
    let total = Infinity;
    while (offset < total) {
      const json = await fetchJson(api.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ limit, offset, searchText: '', appliedFacets: {} }),
      });
      const page = json.jobPostings || [];
      aggregated.push(...page);
      if (offset === 0) total = json.total || page.length;
      offset += limit;
      if (page.length < limit) break;
    }
    return { jobPostings: aggregated };
  }
  return await fetchJson(api.url);
}

// ── Title filter ────────────────────────────────────────────────────

function buildTitleFilter(titleFilter) {
  const positive = (titleFilter?.positive || []).map(k => k.toLowerCase());
  const negative = (titleFilter?.negative || []).map(k => k.toLowerCase());

  return (title) => {
    const lower = title.toLowerCase();
    const hasPositive = positive.length === 0 || positive.some(k => lower.includes(k));
    const hasNegative = negative.some(k => lower.includes(k));
    return hasPositive && !hasNegative;
  };
}
// ── Location filter ─────────────────────────────────────────────────
// Optional. If `location_filter` is absent from portals.yml, all locations pass.
// Semantics:
//   - Empty location string → pass (don't penalize missing data)
//   - `block` matches → reject (takes precedence over allow)
//   - `allow` empty → pass (already cleared block)
//   - `allow` non-empty → must match at least one keyword
// All matches are case-insensitive substring.

function buildLocationFilter(locationFilter) {
  if (!locationFilter) return () => true;
  const allow = (locationFilter.allow || []).map(k => k.toLowerCase());
  const block = (locationFilter.block || []).map(k => k.toLowerCase());

  return (location) => {
    if (!location) return true;
    const lower = location.toLowerCase();
    if (block.length > 0 && block.some(k => lower.includes(k))) return false;
    if (allow.length === 0) return true;
    return allow.some(k => lower.includes(k));
  };
}


// ── Dedup ───────────────────────────────────────────────────────────

function loadSeenUrls() {
  // url -> source label (first writer wins)
  const seen = new Map();
  const add = (url, source) => { if (url && !seen.has(url)) seen.set(url, source); };

  // scan-history.tsv
  if (existsSync(SCAN_HISTORY_PATH)) {
    const lines = readFileSync(SCAN_HISTORY_PATH, 'utf-8').split('\n');
    for (const line of lines.slice(1)) { // skip header
      add(line.split('\t')[0], 'scan-history.tsv');
    }
  }

  // pipeline.md — extract URLs from checkbox lines
  if (existsSync(PIPELINE_PATH)) {
    const text = readFileSync(PIPELINE_PATH, 'utf-8');
    for (const match of text.matchAll(/- \[[ x]\] (https?:\/\/\S+)/g)) {
      add(match[1], 'pipeline.md');
    }
  }

  // applications.md — extract URLs from report links and any inline URLs
  if (existsSync(APPLICATIONS_PATH)) {
    const text = readFileSync(APPLICATIONS_PATH, 'utf-8');
    for (const match of text.matchAll(/https?:\/\/[^\s|)]+/g)) {
      add(match[0], 'applications.md');
    }
  }

  return seen;
}

function loadSeenCompanyRoles() {
  // key -> source label
  const seen = new Map();
  if (existsSync(APPLICATIONS_PATH)) {
    const text = readFileSync(APPLICATIONS_PATH, 'utf-8');
    // Parse markdown table rows: | # | Date | Company | Role | ...
    for (const match of text.matchAll(/\|[^|]+\|[^|]+\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|/g)) {
      const company = match[1].trim().toLowerCase();
      const role = match[2].trim().toLowerCase();
      if (company && role && company !== 'company') {
        const key = `${company}::${role}`;
        if (!seen.has(key)) seen.set(key, 'applications.md');
      }
    }
  }
  return seen;
}

// ── Pipeline writer ─────────────────────────────────────────────────

function appendToPipeline(offers) {
  if (offers.length === 0) return;

  let text = readFileSync(PIPELINE_PATH, 'utf-8');

  // Find "## Pendientes" section and append after it
  const marker = '## Pendientes';
  const idx = text.indexOf(marker);
  if (idx === -1) {
    // No Pendientes section — append at end before Procesadas
    const procIdx = text.indexOf('## Procesadas');
    const insertAt = procIdx === -1 ? text.length : procIdx;
    const block = `\n${marker}\n\n` + offers.map(o =>
      `- [ ] ${o.url} | ${o.company} | ${o.title} | ${o.location || ''} | ${o.published || ''}`
    ).join('\n') + '\n\n';
    text = text.slice(0, insertAt) + block + text.slice(insertAt);
  } else {
    // Find the end of existing Pendientes content (next ## or end)
    const afterMarker = idx + marker.length;
    const nextSection = text.indexOf('\n## ', afterMarker);
    const insertAt = nextSection === -1 ? text.length : nextSection;

    const block = '\n' + offers.map(o =>
      `- [ ] ${o.url} | ${o.company} | ${o.title} | ${o.location || ''} | ${o.published || ''}`
    ).join('\n') + '\n';
    text = text.slice(0, insertAt) + block + text.slice(insertAt);
  }

  writeFileSync(PIPELINE_PATH, text, 'utf-8');
}

function appendToScanHistory(offers, date) {
  const HEADER_V2 = 'url\tfirst_seen\tportal\ttitle\tcompany\tstatus\tlocation\n';
  const HEADER_V1 = 'url\tfirst_seen\tportal\ttitle\tcompany\tstatus\n';

  if (!existsSync(SCAN_HISTORY_PATH)) {
    writeFileSync(SCAN_HISTORY_PATH, HEADER_V2, 'utf-8');
  } else {
    // Migrate v1 (6-col) header in place so any header-based parser stays aligned
    // with the 7-col rows we're about to append. Idempotent — no-op once migrated.
    const contents = readFileSync(SCAN_HISTORY_PATH, 'utf-8');
    if (contents.startsWith(HEADER_V1)) {
      writeFileSync(SCAN_HISTORY_PATH, HEADER_V2 + contents.slice(HEADER_V1.length), 'utf-8');
    }
  }

  const lines = offers.map(o =>
    `${o.url}\t${date}\t${o.source}\t${o.title}\t${o.company}\tadded\t${o.location || ''}`
  ).join('\n') + '\n';

  appendFileSync(SCAN_HISTORY_PATH, lines, 'utf-8');
}

// ── Parallel fetch with concurrency limit ───────────────────────────

async function parallelFetch(tasks, limit) {
  const results = [];
  let i = 0;

  async function next() {
    while (i < tasks.length) {
      const task = tasks[i++];
      results.push(await task());
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => next());
  await Promise.all(workers);
  return results;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose');
  const companyFlag = args.indexOf('--company');
  const filterCompany = companyFlag !== -1 ? args[companyFlag + 1]?.toLowerCase() : null;

  // 1. Read portals.yml
  if (!existsSync(PORTALS_PATH)) {
    console.error('Error: portals.yml not found. Run onboarding first.');
    process.exit(1);
  }

  const config = parseYaml(readFileSync(PORTALS_PATH, 'utf-8'));
  const companies = config.tracked_companies || [];
  const titleFilter = buildTitleFilter(config.title_filter);
  const locationFilter = buildLocationFilter(config.location_filter);

  // 2. Filter to enabled companies with detectable APIs
  const targets = companies
    .filter(c => c.enabled !== false)
    .filter(c => !filterCompany || c.name.toLowerCase().includes(filterCompany))
    .map(c => ({ ...c, _api: detectApi(c) }))
    .filter(c => c._api !== null);

  const skippedCount = companies.filter(c => c.enabled !== false).length - targets.length;

  console.log(`Scanning ${targets.length} companies via API (${skippedCount} skipped — no API detected)`);
  if (dryRun) console.log('(dry run — no files will be written)\n');

  // 3. Load dedup sets
  const seenUrls = loadSeenUrls();
  const seenCompanyRoles = loadSeenCompanyRoles();

  // 4. Fetch all APIs
  const date = new Date().toISOString().slice(0, 10);
  let totalFound = 0;
  let totalFilteredTitle = 0;
  let totalFilteredLocation = 0;
  let totalDupes = 0;
  const newOffers = [];
  const errors = [];

  const tasks = targets.map(company => async () => {
    const { type } = company._api;
    try {
      const json = await fetchApi(company._api);
      const jobs = PARSERS[type](json, company.name, company._api);
      totalFound += jobs.length;

      for (const job of jobs) {
        if (!titleFilter(job.title)) {
          totalFilteredTitle++;
          continue;
        }
        if (!locationFilter(job.location)) {
          totalFilteredLocation++;
          continue;
        }
        if (seenUrls.has(job.url)) {
          totalDupes++;
          if (verbose) {
            console.log(`  dup [url ← ${seenUrls.get(job.url)}] ${job.company} — ${job.title} :: ${job.url}`);
          }
          continue;
        }
        const key = `${job.company.toLowerCase()}::${job.title.toLowerCase()}`;
        if (seenCompanyRoles.has(key)) {
          totalDupes++;
          if (verbose) {
            console.log(`  dup [company+role ← ${seenCompanyRoles.get(key)}] ${job.company} — ${job.title} :: ${job.url}`);
          }
          continue;
        }
        // Mark as seen to avoid intra-scan dupes
        seenUrls.set(job.url, '(this scan)');
        seenCompanyRoles.set(key, '(this scan)');
        newOffers.push({ ...job, source: `${type}-api` });
      }
    } catch (err) {
      errors.push({ company: company.name, error: err.message });
    }
  });

  await parallelFetch(tasks, CONCURRENCY);

  // 5. Write results
  if (!dryRun && newOffers.length > 0) {
    appendToPipeline(newOffers);
    appendToScanHistory(newOffers, date);
  }

  // 6. Print summary
  console.log(`\n${'━'.repeat(45)}`);
  console.log(`Portal Scan — ${date}`);
  console.log(`${'━'.repeat(45)}`);
  console.log(`Companies scanned:     ${targets.length}`);
  console.log(`Total jobs found:      ${totalFound}`);
  console.log(`Filtered by title:     ${totalFilteredTitle} removed`);
  console.log(`Filtered by location:  ${totalFilteredLocation} removed`);
  console.log(`Duplicates:            ${totalDupes} skipped`);
  console.log(`New offers added:      ${newOffers.length}`);

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    for (const e of errors) {
      console.log(`  ✗ ${e.company}: ${e.error}`);
    }
  }

  if (newOffers.length > 0) {
    console.log('\nNew offers:');
    for (const o of newOffers) {
      console.log(`  + ${o.company} | ${o.title} | ${o.location || 'N/A'}`);
    }
    if (dryRun) {
      console.log('\n(dry run — run without --dry-run to save results)');
    } else {
      console.log(`\nResults saved to ${PIPELINE_PATH} and ${SCAN_HISTORY_PATH}`);
    }
  }

  console.log(`\n→ Run /career-ops pipeline to evaluate new offers.`);
  console.log('→ Share results and get help: https://discord.gg/S9zyz2CXZ');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
