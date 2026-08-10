# Upgrade Notes — career-ops v1.7.0 → v1.24.0

**Branch:** `update_to_1.24.0` · **Baseline:** `3799e59` (main) · **Completed:** 2026-08-10
**Scope:** 24 commits · 540 files · +99,564 / −3,005

This document exists because a `git diff` cannot explain *why* this fork differs
from upstream. Most of the remaining differences are deliberate. Read the
[Maintained deltas](#maintained-deltas) section before any future sync.

---

## 1. What upstream commit we track

We track **`santifer/career-ops@e5c9a3a`**, not the v1.24.0 release tag.

| | Commit | Date | Notes |
|---|---|---|---|
| The v1.24.0 release | `35faacc` | 2026-07-30 | `chore: release main (#2245)` |
| **What we synced from** | **`e5c9a3a`** | **2026-08-04** | **73 commits later on `main`** |

Both files read `VERSION = 1.24.0`, because release-please only bumps at release
time and post-release work keeps the old number. So this fork is really at
**"v1.24.0 + 73 commits"**.

This was a deliberate choice. Switching to the release tag would have reverted 64
files to older versions — including `providers/workday.mjs` and `workable.mjs`
(13 tracked companies), the CV-rendering chain, and the whole `test/cv-visual/`
suite — to buy a tidier label.

**Rule:** use `e5c9a3a` for every remaining checkout, so the fork never becomes a
blend of two upstream states.

Also note: upstream moved from `arossia94/career-ops` to `santifer/career-ops`.
This fork continues to update from **arossia94** (see maintained deltas).

---

## 2. Commit history

| # | Commit | What it did |
|---|--------|-------------|
| 1 | `5c5bbad` | Seed v1.24.0 user-layer config/data scaffolds (16 files) |
| 2 | `5e6bc45` | Spanish and Italian locale packs |
| 3 | `33b84d2` | Headless evaluators + multi-CLI entrypoints, `XX/100` patched |
| 4 | `3c62ac2` | **CRITICAL** — canonical agent spec: `AGENTS.md`, `CLAUDE.md`, shared `SKILL.md` router |
| 5 | `263f663` | Dashboard TUI, rescaled `×20` |
| 6 | `c773f61` | Test suites, upgrade fixtures, eval goldens |
| 7 | `e31fc2f` | The 16 new modes, rescaled |
| 8 | `ea04728` | Scripts behind those modes + `Hired` state |
| 9 | `389f797` | **Rehome fork house rules into `modes/_custom.md`** + triage brief |
| 10 | `9dc2241` | `modes/`, `batch/` and the full 76-file provider layer |
| 11 | `fb8e519` | **CRITICAL** — `modes/pdf.md` + CV-rendering dependencies |
| 12 | `52175dc` | `scan.mjs` + `generate-pdf.mjs`; retires `detectApi()` |
| 13 | `5ecfc4a` | Tracker, analytics and liveness scripts |
| 14 | `d0521d8` | `company-history` + `salary-gap` — unblocks the evaluation core |
| 15 | `fc9324f` | Analytics, tracker and contacts scripts (25 files) |
| 16 | `c5b3538` | Discovery layer: `scan-ats-full`, `seeds/`, portal validators |
| 17 | `5cde410` | Jurisdiction tables + remaining application/build scripts |
| 18 | `335c170` | The 7 protective CI workflows (decision 1.3) |
| 19 | `5f6b29f` | Seven operational docs |
| 20 | `9662e86` | `package.json`: 55 scripts, Playwright 1.62, js-yaml security fix |
| 21 | `bcef04a` | Updater closeout: version 1.24.0, coverage validators, harnesses |
| 22 | `f12eccd` | **Score-scale guard** + finish the `XX/100` migration |
| 23 | `e582855` | Pin the CV filename convention in `_custom.md` |
| 24 | `2e7c867` | `data/scan-runs.tsv` from the first real v1.24 pipeline run |

---

## 3. Maintained deltas

**Everything in this section must be re-applied after any future upstream sync.**
`node validate-score-scale.mjs` catches the first one automatically; the rest need
a human.

### 3.1 Scoring: `XX/100`, not `X.X/5`

Upstream scores `X.X/5`. This fork uses **integer 0–100** with a **70/100**
apply/discourage threshold. Roughly **280 references** were converted across
modes, scripts, Go dashboard code, tests and locale packs.

Why it matters: a missed rescale **fails silently**. A `/5` threshold read on a
0–100 scale passes everything — `triage_threshold: 3.5` admits every posting,
`auto_pdf_score_threshold: 4.0` renders a PDF for every offer — with no error.

Load-bearing points (not just cosmetics):
- `tracker-parse.mjs` → `SCORE_CELL_RE` — the single shared gate that
  `verify-pipeline`, `merge-tracker`, `set-status` and `sync-pdf-flags` inherit.
- `tracker.mjs` → `SCORE_RE` — the SQLite index would reject every tracker row.
- `reconcile-pipeline.mjs` — formats scores when writing back to `pipeline.md`.
- `dashboard/internal/data/career.go` — score-distribution buckets.
- `dashboard/internal/ui/screens/pipeline.go` — colour bands and TOP filter.

**Guard:** `node validate-score-scale.mjs` (wired into `.github/workflows/test.yml`).
It matches numeric `/5`, `/5` placeholders (`{X/5}`, `Score/5`) and bare-decimal
thresholds — that last class hid twice, in `modes/pdf.md` and `batch-tailor.mjs`,
where a plain `/5` grep found nothing. Add allowlist entries **with a stated
reason** rather than loosening the patterns.

### 3.2 Repository pointers → `arossia94`

| File | Constants |
|---|---|
| `update-system.mjs` | `CANONICAL_REPO`, `RAW_VERSION_URL`, `RELEASES_API` |
| `upgrade-tests.mjs` | `CANONICAL` |
| `.github/workflows/welcome.yml` | two doc links |

`update-system.mjs` lists **itself** in `SYSTEM_PATHS` and re-execs from
`FETCH_HEAD` during `apply` — so if it is ever re-synced from a santifer-tracking
source, re-patch the three URLs immediately after.

`upgrade-tests.mjs`'s `CANONICAL` must match `update-system.mjs`'s: the harness
writes a git config with `insteadOf = <CANONICAL>` to redirect the updater's fetch
at a local mirror. Mismatched, the redirect never fires.

**Left pointing upstream on purpose:** `scaffolder/bin/cli.mjs` (`REPO`,
`LATEST_RELEASE`) — the `npx` installer path, never run in an existing checkout.
`scaffolder/package.json` is marked `private: true` to block accidental publish.

**Attribution is preserved deliberately** — `package.json` author/homepage,
`.claude-plugin/plugin.json` author, and the `MIT ©` line in the scaffolder README
all credit Santiago Fernández de Valderrama. That is the MIT copyright notice.

### 3.3 Files deliberately held at v1.7

**`modes/oferta.md`, `modes/ofertas.md`, `modes/auto-pipeline.md`** are byte-identical
to `3799e59`. They produce no diff, so without this note they look un-synced.

Their v1.24 versions were rolled back because they depended on scripts absent at
the time. **Those blockers are now cleared** (`browser-extract`, `company-history`,
`salary-gap`, `reserve-report-num` are all present, `batch-prompt.md` defines the
Machine Summary schema, `analyze-patterns.mjs` reads it). Re-syncing is **story
3.10**, deferred — see [To-do](#to-do).

⚠️ `modes/ofertas.md` carries **fork customizations upstream does not have** and
must not be blind-synced:
- Custom dimension weights (CV Match **30%** vs upstream 15%; Remote and Cultural
  zeroed out)
- A keyword penalty rule (−5 points per JD keyword missing from the CV)
- An ATS minimum-requirements cap at 50

Migrate those into `modes/_custom.md` → Scoring Rules **before** syncing that file.
The v1.24 `oferta.md:586` already reads that hook.

### 3.4 `templates/cv-template.html`

Your own design — Helvetica font stack, from commits `4a4eeae` and `6009772`.
Not synced. Upstream's version uses CSS custom properties (`:root`, 16 `var(--)`)
so `theme-style.mjs` can inject fonts and colours from a `style:` block in
`profile.yml`.

Consequence: `theme-style.mjs` finds no tokens and no-ops, so the profile style
block is inert — and `tests/theme-style.test.mjs` fails on that one assertion.
Not a bug; a documented trade-off. To gain theming later, port the Helvetica
choice into upstream's `--font-family` token rather than swapping templates.

### 3.5 `.github/workflows/test.yml`

Three fork deltas, each commented in the file:
- **`test` job** runs `node --test "tests/**/*.test.mjs"` instead of
  `node test-all.mjs --quick`. Our `test-all.mjs` is still v1.7 and a v1.7 harness
  judging v1.24 scripts produces *false* failures (it asserts `verify-pipeline`
  exits 0; the v1.24 script correctly exits 1 on real data errors). Note the glob
  is required — `node --test tests/` resolves the path as a module and dies.
- **`cv-visual` job** omitted — needs the `test:cv-visual` npm script and baseline
  screenshots rendered from upstream's `cv-template.html`.
- **`upgrade-gate` job** omitted — needs release tags, which this fork has none of.
- Plus a **score-scale guard** step added.

### 3.6 Other

- `modes/_custom.md` holds the fork's house rules (see §4).
- `config/profile.yml` pins `auto_pdf_score_threshold: 70` and
  `pipeline.triage_threshold: 70` so the values survive a `modes/` sync.
- `update-system.mjs` `USER_PATHS` adds `config/cv-facts.json` and
  `config/benchmarks.yml` (upstream gitignores them, so its validator never
  sees them).

---

## 4. Where customization lives now

The single most important structural change. Before this upgrade, fork
customizations lived scattered inside system-layer mode files, where every sync
would silently delete them. They are now in the **user layer**, which
`update-system.mjs` is structurally forbidden from touching.

| File | Holds |
|---|---|
| `modes/_custom.md` | Procedural house rules: never drop an experience, never rename a project, source projects from portfolio/GitHub/LinkedIn, the six-point CV verification checklist, the `XX/100` rule, the CV filename convention |
| `modes/_profile.md` | Archetypes, framing, negotiation scripts, location policy |
| `modes/_brief.md` | The ~2K-token triage brief (`modes/triage.md` cannot run without it) |
| `config/profile.yml` | Identity, comp, thresholds |

This was validated twice during the upgrade: syncing `modes/` (`9dc2241`) and
replacing `modes/pdf.md` wholesale (`fb8e519`) both arrived with **zero** of the
fork's customizations — and every one survived in `_custom.md`.

⚠️ `config/profile.yml` and `modes/_profile.md` are **gitignored**, so several
real changes made during this upgrade exist on disk only and are not in any
commit: the threshold keys, the `_profile.md` location-score rescale (`3.0` → `60`),
and the `config/profile.yml` proofread (including the `proof points:` → `proof_points:`
key fix, which had made all eight proof points invisible to every mode).

---

## 5. Deliberate exclusions

Not adopted, on purpose. None of these are outstanding work.

| Excluded | Why |
|---|---|
| `web/` (143 files) | Opt-in alpha web UI; upstream isolates it and exempts it from its own coverage guard |
| `plugins/` + `plugins-registry/` | Plugin subsystem declined. **Exception:** `plugins/_engine.mjs`, `_lock`, `_net`, `_registry` were pulled **inert** because `scan.mjs` hard-imports `_engine`. With no `config/plugins.yml`, `mergeProviderPlugins()` returns immediately. Taking four dead files beat carrying a patched-out import forever |
| Docker (`Dockerfile`, `docker-compose.yml`, `DOCKER.md`) | Not needed locally |
| `manifesto.mjs` + its npm script | Upstream's community-signing flow |
| 9 community CI workflows | `ledger-bot`, `manifesto-guestbook`, `signature-ci`, `gh-events-feed`, `plugin-registry-validate`, `web-ci`, `auto-triage-scan-output`, and 2 PR templates. They depend on upstream's bots, secrets and declined subsystems — adopting them buys permanently red CI |
| Upstream identity files | `CODEOWNERS`, `FUNDING.yml`, `.github/plugin/plugin.json`, plugin/web issue templates |
| Marketing docs | `docs/press/*`, banners, logos, wordmarks, `PLUGINS.md`, `PLUGIN_REVIEW.md`, `REVIEWING.md`, `COWORK.md`, `docs/CODEX.md` (duplicates the root file) |
| Community/governance docs | `MANIFESTO.md`, `SIGNATURES.md`, `CONTRIBUTORS.md`, `MAINTAINERS.md`, `GOVERNANCE.md`, `TRADEMARK.md`, `CODE_OF_CONDUCT.md` |
| 13 locale packs | `ar`, `da`, `fr`, `hi`, `id`, `ja`, `ko`, `nl`, `pl`, `pt`, `ru`, `tr`, `ua`, `zh`, `zh-TW`. **Adopted:** `de` (pre-existing), `es`, `it` |

---

## 6. Operational warnings

### ⛔ Do not run `node update-system.mjs apply` until this branch is merged

`VERSION` now says **1.24.0** and the updater points at **arossia94/career-ops**,
whose `main` is still at **1.7.0**. An `apply` would pull the repository
*backwards*.

### ⚠️ Snapshot `data/` before running `test-all.mjs`

It runs tracker-mutating scripts. Upstream added `--dry-run` guards, but the
standing rule here is to copy `data/applications.md` first and diff afterwards.
That practice caught nothing during this upgrade — because it was always applied.

### ⚠️ `tracker-columns-tests.mjs` collides with real `batch-state.tsv`

It sandboxes `CAREER_OPS_TRACKER`, `CAREER_OPS_ADDITIONS` and the tracker lock,
but **not** `batch/batch-state.tsv`. It writes fixtures for reports #42/#43, which
collide with this repo's real Zebra rows at those numbers, so the merge correctly
refuses them and 2 assertions fail.

With `batch-state.tsv` moved aside: **36 passed, 0 failed**. Upstream test-isolation
gap, not a regression.

### ⚠️ Never put `//` comments inside `SYSTEM_PATHS` / `USER_PATHS`

`extractArrayFromSource()` in `update-system.mjs` parses those arrays naively. An
apostrophe inside a comment (in "upstream's") was read as a string delimiter and
silently produced 23 garbage entries. `validate-system-paths-coverage.mjs` catches it.

### ⚠️ Classify before checking out a root script

Before any `git checkout` of a `.mjs`, compare it against **both** upstream
(`e5c9a3a`) and the v1.7 baseline (`3799e59`). Files matching neither are
already-synced-**and**-patched — re-pulling silently reverts the `/100` work, and
no test catches it. This nearly happened to `gemini-eval.mjs`.

---

## 7. Known-red checks

| Check | Status | Cause |
|---|---|---|
| `tests/user-layer-gitignored.test.mjs` | 🔴 1 of 115 suites | **Decision 1.4** — `modes/_custom.md` and `data/` are declared user-layer in AGENTS.md but not gitignored. A policy question, not a defect |
| `node verify-pipeline.mjs` | 🔴 exit 1 | 3 pre-existing errors: tracker rows #51/#52/#64 reference report files absent from disk. Plus 3 orphan reports (#38, #66, #105). Predates this upgrade |
| `tests/theme-style.test.mjs` | 🔴 1 assertion | `templates/cv-template.html` has no `:root`/`var(--)` tokens — the documented trade-off in §3.4 |
| `validate-untrusted-content-coverage.mjs` | 🔴 2 files | `modes/oferta.md` and `auto-pipeline.md` lack the "Untrusted External Content" directive — they are the v1.7 rollbacks. The rule still applies via `AGENTS.md` and `_shared.md`; what is missing is upstream's per-mode restatement |
| `validate-system-paths-coverage.mjs` | 🔴 1 file | `COMPARISON.md` — resolves when that file is deleted |

Everything else is green: **114/115 node suites**, all 4 Go dashboard packages,
`doctor.mjs`, `validate-portals.mjs` (0 errors across 176 companies),
`validate-score-scale.mjs`, and the standalone harnesses
(`set-status` 75, `followup-seed` 42, `paste-reply` 33, `tracker-writer-lock` 27,
`agent-inbox` 16, `test-salary-filter` 124, `test-trust-validator` 90).

---

## 8. To-do

### Decisions

- [ ] **User-data privacy policy (decision 1.4)** — *does this fork keep committing
      personal data to git?* This is the only item holding CI red, and the only one
      that is hard to reverse.

      Currently gitignored: `cv.md`, `config/profile.yml`, `modes/_profile.md`,
      `article-digest.md`, `portals.yml`, `reports/`, `output/`, `interview-prep/`,
      `data/applications.md`, `data/pipeline.md`.

      **Tracked but declared user-layer:** `modes/_custom.md` and `data/` — which
      includes `data/contacts.tsv` (recruiter names, emails, phones — third-party
      PII), `data/offers/` (contracts, comp), `modes/_brief.md` (comp floor, DQ
      criteria) and `interview-prep/story-bank.md`. All are empty or near-empty
      **today**, which is exactly why deciding now is cheap.

      Options:
      - **(a) Adopt upstream's policy.** Append to `.gitignore`:
        ```
        modes/_custom.md
        modes/_brief.md
        data/
        ```
        then untrack without deleting:
        ```
        git rm --cached -r --ignore-unmatch modes/_custom.md modes/_brief.md data/
        ```
        CI goes green. Note `git rm --cached` stops *future* commits; anything
        already pushed stays in history.
      - **(b) Keep committing** and remove `tests/user-layer-gitignored.test.mjs`
        from the suite.
      - **(c) Split** — ignore only `data/contacts.tsv`, `data/offers/`,
        `data/outcomes/`, `modes/_brief.md`; keep the rest tracked.

- [ ] **Story 3.10 — re-sync the evaluation core.** `oferta.md` (216 → 611 lines),
      `auto-pipeline.md` (71 → 100), `ofertas.md`. All blockers cleared; 6 rescales
      needed. Gains: Block G at 12 signals instead of 5 (the jurisdiction tables are
      inert until then), Risk Summary, `advertised_comp` feeding `salary-gap.mjs`,
      the `_custom.md` Scoring Rules hook, and the untrusted-content directive.
      **Migrate `ofertas.md`'s custom weights to `_custom.md` first** (§3.3).

- [ ] **`templates/cv-template.html` — sync or keep?** Keeping it preserves your
      Helvetica design; syncing gains `theme-style.mjs` theming. Middle path: port
      the Helvetica choice into upstream's `--font-family` token.

- [ ] **`test-all.mjs`** — deferred. Upstream's is 13,142 lines with 149 `/5`
      fixtures, mutates the tracker, and largely duplicates the `tests/` tree.
      Revisit only if CI needs it.

- [ ] **`data/scan-history.tsv`** — ours is 7 columns with no header; v1.24 writes
      11 with one. Additive, so old rows keep parsing. Recommendation: leave it.

### Tasks

- [ ] **Add `.playwright-mcp/` to `.gitignore`** — browser-session artifacts,
      currently untracked noise.

- [ ] **Update `docs/ARCHITECTURE.md`, `CUSTOMIZATION.md`, `SETUP.md`, `SCRIPTS.md`.**
      All four exist here at v1.7 and now describe a system that has changed
      substantially. ⚠️ `SCRIPTS.md` carries this fork's PR #28 `/100` migration —
      re-patch after any sync.

- [ ] **Populate `config/cv-facts.json`.** Seeded with four empty arrays, so
      `verify-cv-facts.mjs` validates nothing. Filling `allow_metrics` from real
      numbers (`$0.7M pilot`, `60+ interviews`, `±1mm`, `12-second cycle`,
      `99% OEE`, `1,000-part`, `$1.9B`, patent `US20250155056A1`) turns it into a
      genuine fabrication gate. Depends on the `profile.yml` proofread (done).

- [ ] **Launch the dashboard.** `npm run build:dashboard`, then
      `npm run serve:dashboard`. It builds and all 4 Go packages pass, but nobody
      has actually looked at it against the real 114-row tracker. Check the score
      buckets (rescaled to 90/80/70/60), the `Hired` state colour, and the report
      viewer.

- [ ] **Add 2–3 golden eval fixtures** from your own robotics reports. Upstream's
      ten are all AI-archetype JDs and measure the wrong thing. Good candidates
      where you already know the answer: OpenAI Mechanical Design 82, Charge
      Robotics 74, Carnegie Robotics ME I 27.

- [ ] **Resolve the 3 tracker errors.** Rows #51/#52/#64 point at report files not
      on disk; #38/#66/#105 are orphan reports. `verify-pipeline` exits 1 until
      then, and other tooling respects that gate.

- [ ] **Delete `COMPARISON.md`** once this document supersedes it. It no longer
      represents outstanding work — most remaining rows are deliberate exclusions
      or files that differ *because* of the maintained deltas above.

- [ ] **Clear `.update-dismissed`** if you want session-start update checks back.

- [ ] **Open the PR** `update_to_1.24.0` → `main`. Gated by decision 1.4: with CI
      red, the PR either cannot merge under branch protection or merges with a
      known-failing check. Make that a choice, not an accident.

---

## 9. Notable finds

Things this upgrade uncovered that were not on the original plan:

- **`narrative.proof points:`** in `config/profile.yml` had a **space instead of an
  underscore**. The system reads `proof_points`, so all eight quantified proof
  points — MIXOT's $0.7M pilot, the ±1mm/12s inspection system, patent
  US20250155056A1, the $1.9B ADNOC agreement — were **invisible to every mode in
  every locale**. One character.

- **FEEDBACK D1 was still live.** `batch/batch-prompt.md` hardcoded upstream's six
  AI archetypes and never read `modes/_profile.md`, so batch runs would have scored
  every robotics posting against AI/LLMOps archetypes. Fixed by the v1.24 sync
  (`9dc2241`) and confirmed working in the smoke test.

- **`dashboard/internal/data/career.go` score buckets** were still `/5` after the
  dashboard sync — every application collapsed into one histogram bar. Caught by
  `validate-score-scale.mjs`, not by any test.

- **`modes/oferta.md:192`** carried a `>= 4.5` gate that this fork's own PR #28
  `/100` migration missed, as did `modes/pdf.md`'s `below 4.0/5`. Both were
  bare-decimal thresholds invisible to a `/5` grep.

- **Your `detectApi()` contributions were absorbed upstream.** BambooHR, Recruitee,
  Workable, Workday, SmartRecruiters and Rippling all exist as first-class provider
  modules — superseded by hardened versions with SSRF guards and pagination fixes,
  not lost.

- **Dover (Azalea Robotics) has no viable provider.** Cloudflare-Turnstile-protected
  SPA, API keyed on internal ids rather than the public slug. Upstream has no Dover
  provider either. The `scan_method: playwright` entry in `portals.yml` is correct;
  `docs/local-parser-cookbook.md` is the route if you want coverage.
