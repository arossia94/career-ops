#!/usr/bin/env node

/**
 * validate-score-scale.mjs — guards this fork's XX/100 scoring convention.
 *
 * This fork scores on an integer 0-100 scale; upstream career-ops uses X.X/5.
 * Every upstream sync therefore has to be re-patched, and a missed patch fails
 * SILENTLY: a /5 threshold read on a 0-100 scale simply passes everything
 * (triage_threshold 3.5 admits every posting; auto_pdf_score_threshold 4.0
 * renders a PDF for every offer), with no error to notice.
 *
 * That is not hypothetical — during the v1.24.0 upgrade a `git checkout` of
 * modes/ silently reverted modes/triage.md and upskill.mjs to /5, and two
 * thresholds written as bare decimals (modes/pdf.md, batch-tailor.mjs) were
 * missed by a plain "/5" grep. This check exists so neither can recur.
 *
 * Run: node validate-score-scale.mjs
 * Exit 0 = clean. Exit 1 = offending lines listed.
 */

import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { extname } from 'path';

const SCANNED_EXT = new Set(['.mjs', '.md', '.sh', '.go', '.yml', '.yaml', '.json']);

// Paths never scanned: generated output, third-party code, historical records,
// and the user's own evaluation corpus (reports/ predates the migration).
const SKIP_PREFIX = [
  'node_modules/', '.git/', 'reports/', 'output/', 'batch/logs/',
  'batch/tracker-additions/', 'FEEDBACK/', 'COMPARISON.md', 'CHANGELOG.md',
  'test-fixtures/', 'data/',
  // This file necessarily contains every pattern it searches for, in both its
  // regexes and its documentation. Scanning itself is guaranteed noise.
  'validate-score-scale.mjs',
];

// Patterns that look like a /5 score but are not one. Each entry must say why,
// so the allowlist stays auditable instead of accumulating silent exemptions.
const ALLOW = [
  [/Mozilla\/5\.0/, 'browser user-agent string'],
  [/\/5[0-9]/, 'a longer number (e.g. /50, /512)'],
  [/Glassdoor/i, "Glassdoor's own 1-5 interview-difficulty rating"],
  [/\d+\/5 (applications|low-fit|reports)/, 'a ratio (N out of 5), not a score'],
  [/1\/3\/4\/5-column/, 'column-count contract in modes/pipeline.md'],
  [/https?:\/\/[^\s)]*\/5\b/, 'a URL path ending in /5'],
  [/X\.X\/5` scale anywhere|says `\/5`, this rule wins/, "modes/_custom.md's own rule forbidding /5"],
  [/\/5-scale fixtures|149 \/5/, 'commentary about the deferred test-all.mjs'],
  [/distinzione|distinction that matters/, 'prose that happens to contain a slash'],
  [/score\s*\+=/, 'a scoring increment, not a threshold'],
  [/would score \d\.\d against/, 'prose in fingerprint-core about similarity'],
  [/Math\.max\(0, 100 - report\.score\) : 1\.0/, 'fallback weight when a report has no score'],
  [/score \d\.\d\/\d\.\d/, 'a fixture string inside tracker notes, not a score cell'],
];

// A real /5 score reference, or a bare-decimal threshold on the old scale.
const OFFENDERS = [
  [/\b\d+(?:\.\d+)?\\?\/5\b/, '/5 score reference'],
  // Placeholder forms are how mode files write it: `**Score:** {X/5}`, `X.X/5`,
  // `Score/5`. These carry no digit, so the numeric pattern above misses them —
  // and they are the most common form in the prompt layer.
  [/\b(?:X+(?:\.X+)?|Score|Punteggio|Puntuaci[oó]n)\\?\/5\b/i, '/5 placeholder in a score template'],
  [/\bscore\b[^\n]{0,24}\b[0-4]\.\d\b/i, 'bare-decimal score threshold (old /5 scale)'],
  [/--min-score[= ]\s*[0-4]\.\d\b/, 'bare-decimal --min-score default'],
  [/\b(?:1-5|1–5)\b\s*(?:scale|score|criteria|global)/i, '1-5 scale descriptor'],
];

function tracked() {
  return execFileSync('git', ['ls-files'], { encoding: 'utf-8', maxBuffer: 60e6 })
    .split('\n').filter(Boolean);
}

const findings = [];
for (const file of tracked()) {
  if (SKIP_PREFIX.some((p) => file.startsWith(p))) continue;
  if (!SCANNED_EXT.has(extname(file))) continue;

  let lines;
  try { lines = readFileSync(file, 'utf-8').split('\n'); } catch { continue; }

  lines.forEach((line, i) => {
    if (ALLOW.some(([re]) => re.test(line))) return;
    for (const [re, label] of OFFENDERS) {
      if (re.test(line)) {
        findings.push({ file, line: i + 1, label, text: line.trim().slice(0, 96) });
        return;
      }
    }
  });
}

if (findings.length === 0) {
  console.log('OK: no /5-scale references outside the allowlist — XX/100 convention intact');
  process.exit(0);
}

console.error(`Score-scale violations (${findings.length}) — this fork uses XX/100, not X.X/5:`);
for (const f of findings) console.error(`  ${f.file}:${f.line}  [${f.label}]\n    ${f.text}`);
console.error('\nRescale to XX/100 (x20), or add an ALLOW entry here with a reason if it is a false positive.');
process.exit(1);
