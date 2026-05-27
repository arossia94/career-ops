# Modo: ofertas — Comparación Multi-Oferta

10-dimensional weighted Scoring matrix

| Dimension | Weight | Criteria 1-5 |
|-----------|------|----------------|
| Alignment | 20% | 5=exact target role, 1=unrelated |
| CV Match | 30% | 5=90%+ match, 1=<40% match o missing minimum requirements |
| Seniority Level | 5% | 5=staff+, 4=senior, 3=mid-senior, 2=mid, 1=junior |
| Competitiveness | 10% | 5=top quartile, 1=below market |
| Growth opportunities | 10% | 5=clear path to next level, 1=dead end |
| Remote work quality | 0% | 5=full remote async, 1=onsite only |
| Employer reputation | 5% | 5=top employer, 1=red flags |
| Tech Stack Modernity | 5% | 5=cutting edge AI/ML, 1=legacy |
| Hiring process speed | 5% | 5=fast process, 1=6+ months |
| Cultural signals | 0% | 5=builder culture, 1=bureaucratic |

If there are keywords in the job description, discount 5 points from the total score for each keyword missing from the CV.

If the CV misses any of the minimum requirements in the job description, cap the maximum global score at 50.0 since it will be filtered out via ATS almost certainly. Communicate this penalty to the user and say which minimum requirements are missing.

For each job offer: score in each dimension. All scores should be reported in linear scale from 0 (worst score) to 100 (perfect score).
Inform the final Ranking final and a recommendation considering the time-to-offer factor.

Ask the user the offer if they are not in the contexts. It could be the text of the job offer, URLs or references to a previously evaluated offer found in the tracker.