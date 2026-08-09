# Federico Baravalle — Triage Brief

<!-- ============================================================
     THIS FILE IS YOURS. It is USER LAYER — never auto-updated.

     PURPOSE: compact context for first-pass triage agents
     (`modes/triage.md`). It replaces reading the full evaluation
     stack (cv.md + _shared.md + _profile.md + profile.yml +
     oferta.md) with a single ~1.5-2K token read.

     Scores here are on this fork's 0-100 scale, matching
     `modes/triage.md` and `modes/_custom.md`. Keep it short —
     every line is read once per role during batch triage.
     ============================================================ -->

## Identity
Senior Mechanical Engineer / Technical Program Manager — 6+ yrs, electromechanical
systems from concept to commissioning. Atlanta, GA (GMT-4). US-based, **no visa
sponsorship required**. Hybrid preferred, fully on-site possible.

## Target Archetypes
Triage scores "archetype fit" against this list. Direct hit = 80-100, adjacent
title = 60, mismatch = 20-40.

| # | Archetype | What they buy (proof) |
|---|-----------|------------------------|
| 1 | **Mechanical Engineer** (primary, Senior/Staff) | Full-lifecycle mechanical design — DFM/DFMA, FEA, GD&T, prototyping, NPI into production and sustaining |
| 2 | **Technical Program Manager** (secondary, Mid-Senior) | Multi-workstream ownership, critical path, cross-functional delivery at $10M+ scope with VP visibility |
| 3 | **Technical Project Manager** (adjacent, Senior/Staff) | On-time scope delivery, stakeholder alignment, technical bridge across mechanical/electrical disciplines |

Analog titles that are valid targets, not misses: Mechanical Design Engineer,
Robotics/Hardware Mechanical Engineer, Mechanical Systems Engineer, Product
Development Engineer, Hardware Program Manager.

## Proof Points (use exact metrics in matching)
- **MIXOT (co-founder/CTO):** qualified a **$0.7M** pilot pre-product from **60+**
  customer-discovery interviews and an **84-task** industrial automation proposal.
- **Toulouse Metro L3 (Alstom):** led electrification subsystem across architecture,
  validation and first-batch production — design review on schedule, **100%**
  compliance with customer requirement specs.
- **Tenaris opto-mechanical inspection:** automated system at **±1mm** tolerance,
  **12-second** cycle, on a **99% OEE** line; replaced offline CMM sampling with
  100% in-line inspection.
- **Tenaris TBG1™:** **20+** FEA studies across 10 concepts with Matlab
  post-processing → patent **US20250155056A1** and commercial release.
- **Thermo Fisher:** refactored a **1,000-part** assembly, parameterizing **30**
  key components across the product family — Time-to-Market down **2 weeks**;
  led EU Machinery Directive FATs with **no failures**.

## Comp Strategy
| Target | Requirement |
|--------|-------------|
| $130K-$300K | Target total-comp band |
| $130K | **Hard floor** |

**Below $130K, FAIL regardless of other signals.**

## Location Scoring
- Fully remote / async-first → **100**
- Light hybrid (flexible, few days/month) → **80-100**
- Hybrid or on-site in/near Atlanta (no relocation) → **80**
- Hybrid outside the country → **60** (not 20)
- On-site requiring relocation → **60**, and only if comp clears the band
- High travel (>25%) → deduct **10-20**

## Hard DQ Criteria — instant FAIL
Cap the score at **70** immediately and skip detailed analysis if ANY apply.

- Explicitly entry-level / new-grad / Bachelor's-with-no-experience requirement
  (steep downlevel from the Senior/Staff target)
- Stated comp ceiling below the **$130K** floor
- Core requirement in a discipline outside mechanical / program-delivery scope
  (e.g. primary hands-on software or electrical design ownership)

<!-- Add or remove DQ lines as the search evolves; these are derived from the
     patterns already visible in data/applications.md. -->

## Quick Scoring Guide
Bands match the verdict table in `modes/triage.md`. Threshold is
`config/profile.yml → pipeline.triage_threshold` (default **70**).

| Score | Verdict | What it means |
|-------|---------|---------------|
| ≥ threshold (default 70) | **PASS** | Clears the bar — archetype + comp + location align, gaps bridgeable |
| 60 – (threshold − 1) | **MARGINAL** | Borderline — one line shown to the user |
| < 60 | **FAIL** | Does not clear the bar — filtered |

## Soft Red Flags (−10 each, additive)
- A "required" certification or license listed as a gap
- Experience bar well above 6+ yrs (e.g. 10+ yrs stated as a hard requirement)
- Seed-stage company with undisclosed comp
- Domain requiring a full framing rewrite away from the primary archetype

## Priority Override List — always return PASS regardless of score
<!-- Companies to surface no matter what (specific interest, warm intro, etc.) -->

(none yet)
