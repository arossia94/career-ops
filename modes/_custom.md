# Custom Instructions -- career-ops

<!-- ============================================================
     THIS FILE IS YOURS. It will NEVER be auto-updated.

     Put your own house rules, custom workflows, and automations
     here -- anything you want the agent to ALWAYS do (or never do).

     This is for PROCEDURAL rules ("HOW I want things done").
     For WHO you are (archetypes, narrative, comp, negotiation),
     use modes/_profile.md instead. Keeping the two separate keeps
     each one readable.

     The agent reads this file alongside the system instructions;
     your rules here take precedence over the defaults, as long as
     they don't break the Data Contract (your files are never
     touched, and we never auto-submit an application for you).

     Because this is a user-layer file, anything you write here
     survives `node update-system.mjs`. Put customizations HERE,
     not in CLAUDE.md / modes/_shared.md / other system files --
     those get overwritten on update.
     ============================================================ -->

## House Rules

### CV content: reformulate, but do not restructure the record

These rules take precedence over the default "reorder, reframe, emphasise"
guidance wherever the two conflict. Reframing is allowed; rewriting the record
is not.

1. **Never drop an experience.** Every role in `cv.md` appears in every
   generated CV. Shortening a role's description is fine; removing the role is
   not. A generated CV must never manufacture a career gap.

2. **Never rename a project.** When a JD matches or closely matches past work,
   emphasise the relevant projects and the portfolio -- but keep each project's
   name exactly as it appears in `cv.md`, the portfolio site, GitHub, or
   LinkedIn.

3. **Source projects from the whole record, not just `cv.md`.** Select the top
   3-4 projects for a role from `cv.md` *plus* the portfolio site, GitHub, and
   LinkedIn profiles listed in `config/profile.yml`. Never invent a project.

4. **The Professional Summary names real projects.** Inject JD keywords and
   mention the relevant portfolio projects by name -- never invent a skill,
   project, or experience to do it.

### Verification before a CV is handed over

After generating any CV -- HTML, LaTeX, or Canva -- run these checks explicitly
and report the result. Do not present a CV as finished until they pass.

- No career gap manufactured: every `cv.md` experience is present (shortened is
  fine, dropped is not)
- Personal and contact details match `cv.md`
- Education and previous experience match `cv.md`
- Projects match `cv.md`, the portfolio site, GitHub, and LinkedIn
- Skills and coding languages attached to each project match how that project is
  described in `cv.md`, GitHub, or LinkedIn
- The Professional Summary contains no invented experience or skills

## Custom Workflows

<!-- Multi-step routines you run often, given a short name. -->

(none yet -- add yours above)

## Output Preferences

- **Scores are integers on a 0-100 scale (`XX/100`).** This fork does not use
  the upstream `X.X/5` scale anywhere -- reports, tracker rows, triage lines,
  and machine summaries all use `XX/100`. The apply/discourage threshold is
  **70/100**. If any instruction you have loaded says `/5`, this rule wins.

- **Generated CV filename.** Always write CVs to a flat `output/` path using:

  ```
  output/CV-{candidate}-{company}-{DD_MM_YY}.pdf
  output/CV-{candidate}-{company}-{role}-{DD_MM_YY}.pdf   ← multi-role companies
  ```

  Rules:
  - `{candidate}` and `{company}` in **Snake_Case** (e.g. `Federico_Baravalle`,
    `Agility_Robotics`). Uppercase `CV-` prefix.
  - `{DD_MM_YY}` — day, month, two-digit year (e.g. `26_07_26`).
  - **Add `{role}` whenever this company already has another application in
    `data/applications.md`**, so multiple roles at one employer stay
    distinguishable (e.g. `CV-Federico_Baravalle-Apptronik-Senior_ME-30_07_26.pdf`).
    Keep the role short and in Snake_Case.
  - The same stem applies to the intermediate `/tmp` HTML/JSON, the `.tex` in
    `latex` mode, and the Canva export (which appends `-canva`).

  This takes precedence over the bundle layout in `modes/pdf.md`
  (`cv/tailored/vNNN/cv.pdf`) and over the ISO-dated `cv-…` form in
  `modes/latex.md`. Bundle artifacts may still be created for JD-similarity
  reuse tracking; the deliverable PDF goes to the flat `output/` path above.

## Off-Limits

- Never auto-fill or submit an application without showing me first.
- Never edit a system file to customize my setup -- it belongs here or in
  `modes/_profile.md`.
