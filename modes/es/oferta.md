# Modo: oferta — Evaluación Completa A-G

Cuando el candidato pega una oferta (texto o URL), entregar SIEMPRE los 7 bloques (evaluación A-F + legitimidad G):

## Paso 0 — Detección de Arquetipo

Clasificar la oferta en uno de los 6 arquetipos (ver `_shared.md`). Si es híbrido, indicar los 2 más cercanos. Esto determina:
- Qué proof points priorizar en bloque B
- Cómo reescribir el summary en bloque E
- Qué historias STAR preparar en bloque F

## Bloque A — Resumen del Rol

Tabla con:
- Arquetipo detectado
- Dominio (platform/agentic/LLMOps/ML/enterprise)
- Función (build/consult/manage/deploy)
- Seniority
- Remoto (full/hybrid/onsite)
- Tamaño del equipo (si se menciona)
- TL;DR en 1 frase

## Bloque B — Match con CV

Lee `cv.md`. Crea tabla con cada requisito del JD mapeado a líneas exactas del CV.

**Adaptado al arquetipo:**
- Si FDE → priorizar proof points de delivery rápida y client-facing
- Si SA → priorizar diseño de sistemas e integrations
- Si PM → priorizar product discovery y métricas
- Si LLMOps → priorizar evals, observability, pipelines
- Si Agentic → priorizar multi-agent, HITL, orchestration
- Si Transformation → priorizar change management, adoption, scaling

Sección de **gaps** con estrategia de mitigación para cada uno. Para cada gap:
1. ¿Es un hard blocker o un nice-to-have?
2. ¿Puede el candidato demostrar experiencia adyacente?
3. ¿Hay un proyecto portfolio que cubra este gap?
4. Plan de mitigación concreto (frase para cover letter, proyecto rápido, etc.)

## Bloque C — Nivel y Estrategia

1. **Nivel detectado** en el JD vs **nivel natural del candidato para ese arquetipo**
2. **Plan "vender senior sin mentir"**: frases específicas adaptadas al arquetipo, logros concretos a destacar, cómo posicionar la experiencia de founder como ventaja
3. **Plan "si me downlevelan"**: aceptar si comp es justa, negociar review a 6 meses, criterios de promoción claros

## Bloque D — Comp y Demanda

Usar WebSearch para:
- Salarios actuales del rol (Glassdoor, Levels.fyi, Blind)
- Reputación de compensación de la empresa
- Tendencia de demanda del rol

Tabla con datos y fuentes citadas. Si no hay datos, decirlo en vez de inventar.

## Bloque E — Plan de Personalización

| # | Sección | Estado actual | Cambio propuesto | Por qué |
|---|---------|---------------|------------------|---------|
| 1 | Summary | ... | ... | ... |
| ... | ... | ... | ... | ... |

Top 5 cambios al CV + Top 5 cambios a LinkedIn para maximizar match.

## Bloque F — Plan de Entrevistas

6-10 historias STAR+R mapeadas a requisitos del JD (STAR + **Reflection**):

| # | Requisito del JD | Historia STAR+R | S | T | A | R | Reflection |
|---|-----------------|-----------------|---|---|---|---|------------|

La columna **Reflection** recoge qué se aprendió o qué se haría distinto. Esto señala seniority: los candidatos junior describen lo que pasó, los sénior extraen lecciones.

**Story Bank:** Si `interview-prep/story-bank.md` no existe, copia `interview-prep/story-bank.example` y renómbralo como `interview-prep/story-bank.md`. Si `interview-prep/story-bank.md` existe, comprueba si alguna de estas historias ya está ahí. Si no lo están, añade las nuevas al final. Con el tiempo esto construye un banco reutilizable de 5-100 historias maestras adaptables a cualquier pregunta de entrevista.

**Seleccionadas y enmarcadas según el arquetipo:**
- FDE → enfatizar velocidad de entrega y client-facing
- SA → enfatizar decisiones de arquitectura
- PM → enfatizar discovery y trade-offs
- LLMOps → enfatizar métricas, evals, production hardening
- Agentic → enfatizar orchestration, error handling, HITL
- Transformation → enfatizar adopción, cambio organizacional

Incluir también:
- 1 case study recomendado (cuál de sus proyectos presentar y cómo)
- Preguntas red-flag y cómo responderlas (ej: "¿por qué vendiste tu empresa?", "¿tienes equipo de reports?")

## Bloque G — Posting Legitimacy

Analizar la oferta en busca de señales que indiquen si se trata de una vacante real y activa. Esto ayuda al usuario a priorizar su esfuerzo en las oportunidades con más probabilidad de derivar en un proceso de contratación.

**Marco ético:** Presentar observaciones, no acusaciones. Toda señal tiene explicaciones legítimas. El usuario decide cómo ponderarlas.

### Señales a analizar (en orden):

**1. Frescura de la oferta** (del snapshot de Playwright, ya capturado en el Paso 0):
- Fecha de publicación o "hace X días" — extraer de la página
- Estado del botón de aplicar (activo / cerrado / ausente / redirige a una página genérica)
- Si la URL redirigió a una página de empleo genérica, anotarlo

**2. Calidad de la descripción** (del texto del JD):
- ¿Nombra tecnologías, frameworks o herramientas concretas?
- ¿Menciona tamaño del equipo, línea de reporte o contexto organizativo?
- ¿Son realistas los requisitos? (años de experiencia frente a antigüedad de la tecnología)
- ¿Hay un alcance claro para los primeros 6-12 meses?
- ¿Se menciona salario o compensación?
- ¿Qué proporción del JD es específica del rol frente a texto genérico de relleno?
- ¿Hay contradicciones internas? (título de entry-level con requisitos de staff, etc.)

**3. Señales de contratación de la empresa** (2-3 consultas de WebSearch, combinar con la investigación del Bloque D):
- Buscar: `"{company}" layoffs {year}` — anotar fecha, escala, departamentos
- Buscar: `"{company}" hiring freeze {year}` — anotar cualquier anuncio
- Si se encuentran despidos: ¿son en el mismo departamento que este rol?

**4. Detección de republicación** (de scan-history.tsv):
- Comprobar si la empresa + un título de rol similar aparecieron antes con una URL distinta
- Anotar cuántas veces y en qué periodo

**5. Contexto de mercado del rol** (cualitativo, sin consultas adicionales):
- ¿Es un rol común que suele cubrirse en 4-6 semanas?
- ¿Tiene sentido el rol para el negocio de esta empresa?
- ¿Es un nivel de seniority que legítimamente tarda más en cubrirse?

### Formato de salida:

**Assessment:** Uno de los tres niveles:
- **High Confidence** — Varias señales apuntan a una vacante real y activa
- **Proceed with Caution** — Señales mixtas que conviene anotar
- **Suspicious** — Múltiples indicadores de oferta fantasma, investigar antes de invertir tiempo

**Tabla de señales:** Cada señal observada con su hallazgo y su peso (Positive / Neutral / Concerning).

**Context Notes:** Cualquier matiz (rol de nicho, empleo público, vacante permanente, etc.) que explique señales potencialmente preocupantes.

### Manejo de casos límite:
- **Ofertas de administración pública o academia:** Los plazos más largos son lo normal. Ajustar los umbrales (60-90 días es normal).
- **Ofertas evergreen o de contratación continua:** Si el JD dice explícitamente "ongoing" o "rolling", anotarlo como contexto — no es una oferta fantasma, es un rol de pipeline.
- **Roles de nicho o ejecutivos:** Los roles Staff+, VP, Director o muy especializados permanecen abiertos meses de forma legítima. Ajustar los umbrales de antigüedad en consecuencia.
- **Startup / pre-revenue:** Las empresas en fase inicial pueden tener JDs vagas porque el rol está realmente sin definir. Ponderar menos la vaguedad de la descripción.
- **Sin fecha disponible:** Si no se puede determinar la antigüedad de la oferta y ninguna otra señal es preocupante, usar por defecto "Proceed with Caution" con una nota indicando que los datos disponibles eran limitados. NUNCA usar "Suspicious" por defecto sin evidencia.
- **Vía reclutador (sin oferta pública):** No hay señales de frescura disponibles. Anotar que el contacto activo de un reclutador es en sí mismo una señal positiva de legitimidad.

---

## Post-evaluación

**SIEMPRE** después de generar los bloques A-G:

### 1. Guardar report .md

Guardar evaluación completa en `reports/{###}-{company-slug}-{YYYY-MM-DD}.md`.

- `{###}` = siguiente número secuencial (3 dígitos, zero-padded)
- `{company-slug}` = nombre de empresa en lowercase, sin espacios (usar guiones)
- `{YYYY-MM-DD}` = fecha actual

**Formato del report:**

```markdown
# Evaluación: {Empresa} — {Rol}

**Fecha:** {YYYY-MM-DD}
**Arquetipo:** {detectado}
**Score:** {X/100}
**Legitimacy:** {High Confidence | Proceed with Caution | Suspicious}
**PDF:** {ruta o pendiente}

---

## A) Resumen del Rol
(contenido completo del bloque A)

## B) Match con CV
(contenido completo del bloque B)

## C) Nivel y Estrategia
(contenido completo del bloque C)

## D) Comp y Demanda
(contenido completo del bloque D)

## E) Plan de Personalización
(contenido completo del bloque E)

## F) Plan de Entrevistas
(contenido completo del bloque F)

## G) Posting Legitimacy
(contenido completo del bloque G)

## H) Draft Application Answers
(solo si score >= 70 — borradores de respuestas para el formulario de aplicación)

---

## Keywords extraídas
(lista de 15-20 keywords del JD para ATS optimization)
```

### 2. Registrar en tracker

**SIEMPRE** registrar en `data/applications.md`:
- Siguiente número secuencial
- Fecha actual
- Empresa
- Rol
- Score: promedio de match (0-100)
- Estado: `Evaluada`
- PDF: ❌ (o ✅ si auto-pipeline generó PDF)
- Report: link relativo al report .md (ej: `[001](reports/001-company-2026-01-01.md)`)

**Formato del tracker:**

```markdown
| # | Fecha | Empresa | Rol | Score | Estado | PDF | Report |
```