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

Para cada oferta: score en cada dimensión, score ponderado total. Todos los scores deberían ser transformados linealmente a una escala de 0 a 100.
Ranking final + recomendación con consideraciones de time-to-offer.

Pedir al usuario las ofertas si no están en contexto. Puede ser texto, URLs, o referencias a ofertas ya evaluadas en el tracker.