1) The cv.md file is inside the dual-track-enigneer-instructor, but there's another one in the parent folder, it could be confusing. For the meanwhile I will create a new cv.md at root.
    -**Location:** Milan, IT Need to ve a variable
    -**Portfolio:** mixot.eu to be created with personal projects
    -**Professional Summary** One for ME and one for TPM. Now I will do for ME    
2) Same with profile.yml. I would have one in ./config an one other in ./examples
3) Important to keep traceability of different parts of the CV (Professional_Summary, Experience, Skills, Education, Certifications, Projects, etc.)
4) Need to add Some writing examples in the folder so the agent can look how I write.
5) To check Scoring System based on what I found with ATS (in the _shared.md file).
6) GEMINI.md (lines 38, 58) and README.md still reference "All 15 commands are defined in .gemini/commands/*.toml" — but those files no longer exist. That's a doc drift from the PR.
  1. The README/GEMINI.md should be updated to point at .agents/skills/career-ops/SKILL.md as the single source.
  2. Or .gemini/commands/ should be restored if Gemini CLI doesn't actually read .agents/skills/ yet.
- Follow your actual availability from profile.yml
7)   Your archetypes (TPM / Technical PM / Mechanical Engineer) already live correctly in modes/_profile.md:22-26. The flow in _shared.md:87 is exactly this: detect a generic archetype
  first, then read _profile.md for your specific framing — so the AI-flavored table in _shared.md:78-85 is just the system's default scaffolding, not the source of truth for your search.

  What's actually missing, though: your _profile.md archetype table has thematic axes and what they buy, but no JD keyword signals — which is what _shared.md:78-85 provides for the
  default archetypes. If you want the detector to reliably classify a JD as TPM vs Project Manager vs Mech Eng, add a "Key signals in JD" column to your _profile.md table (e.g., TPM →
  "program", "cross-functional", "roadmap", "dependencies"; Mech Eng → "DFM", "FEA", "tolerancing", "NPI"). That's a user-layer edit, safe from updates.
8) update-system.mjs cleanup. Once you sever upstream, this script becomes dead weight — it polls a remote you no longer track. Either delete it or repoint it at your fork's releases if you'll have multiple machines/clones.
9) VERSION file. Same logic: either keep it for your own release discipline or drop it.
10) REWRITE package.json — name, repo URL, bugs URL, author.
11) Rebrand attribution. AGENTS.md opens with an "Origin" paragraph crediting santifer and linking to his portfolio + cv-santiago. For a derivative, you keep his credit (license likely requires it) but add your own framing: "This is a derivative of santifer's career-ops, adapted for [TPM / PM / Mech Eng] roles." Same edit in README.md and CLAUDE.md/GEMINI.md if they have similar blocks.
12) portals.yml: I think Portals search queries on top giving null as output, thus are not working, let see what happen.
