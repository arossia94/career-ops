# Mode: interview/plan — Planificador de Preparación para Entrevistas

Dada una descripción de puesto (JD) y la fecha/hora de la entrevista, construye un plan de preparación estructurado y con bloques de tiempo, adaptado a las carencias específicas del candidato.

---

## Inputs

1. **Descripción del puesto (JD)** (requerido) — pégalo en línea o proporciona la URL
2. **Fecha y hora de la entrevista** (requerido) — para calcular las horas disponibles
3. **Nombre y rol del entrevistador** (si se conoce) — determina la profundidad y el tono de la preparación
4. **Tipo de ronda** (si se conoce) — filtro (screening), técnico/específico del dominio, diseño/estudio de caso, panel conductual (behavioral)
5. **CV** en `cv.md` + `article-digest.md` (si está presente) — lee para obtener experiencia, habilidades y puntos de prueba
6. **Perfil** en `config/profile.yml` + `modes/_profile.md` — lee para la narrativa, arquetipos y objetivos
7. **Banco de historias** en `interview-prep/story-bank.md` — historias STAR+R existentes
8. **Banco de preguntas** en `interview-prep/question-bank.md` — carencias existentes (si el archivo existe)
9. **Compensación declarada previamente** — si se conoce el tracker#, ejecuta `node salary-gap.mjs --stated-for <tracker#>` (cero tokens). Cualquier observación `stated` previa es una cifra que el candidato ya comprometió, en una ronda anterior, ante un entrevistador concreto: incorpórala a la referencia rápida del Step 4 para que el candidato se mantenga consistente en lugar de renegociar sin darse cuenta.
---

## Step 1 — Evaluación de Ajuste

Lee el CV y la JD. Produce una evaluación de dos columnas:

**Fortalezas en las que anclarse:** experiencia, títulos, dominio, puntos de prueba que coincidan directamente con la JD.

**Carencias a cubrir:** habilidades, herramientas o experiencia mencionadas en la JD que estén ausentes o sean débiles en el CV. Clasifícalas por la probabilidad de ser evaluadas en este tipo de ronda específica.

Sé honesto. Una carencia es una carencia — márcala claramente para que el tiempo de preparación se dedique a los lugares correctos.

---

## Step 2 — Inteligencia de la Ronda

Identifica qué está evaluando realmente esta ronda basándote en:

- Rol del entrevistador (manager = comunicación + pasión + fundamentos; practitioner = profundidad + criterio)
- Etiqueta de la ronda (filtro, técnico/dominio, diseño/caso de estudio, final)
- Señales de la JD (qué enfatizan)

**Filtro del reclutador (Recruiter screen):**

- Verificación de requisitos: ajuste, alineación de compensación, logística, comunicación
- No es una prueba técnica — las preguntas de profundidad vienen en las rondas con el HM (Hiring Manager) y posteriores
- Probable: presentación de background, "por qué nosotros/por qué este rol", expectativa salarial, plazos, una pregunta de logística
- Trata esto como el punto de control fácil; usa el tiempo de preparación para construir la base de lo que viene después

**Filtro del Hiring Manager:**

- Comunicación, pasión, ajuste — además de filosofía de liderazgo y criterio
- Fundamentos de la habilidad central de la JD — no aspectos internos profundos
- 1–2 historias conductuales
- Probable: background, "por qué nosotros", un concepto central de la JD, una historia de liderazgo, pregunta situacional con visión de futuro

**Inmersión técnica / de dominio con un practitioner:**

- Profundidad en la habilidad central de la JD (ej. internals del runtime para ingeniería, opciones de modelado para datos, métodos de valoración para finanzas)
- Escenarios aplicados del día a día del rol
- Es posible un ejercicio en vivo o un recorrido guiado
- Las historias se usan como evidencia, no como el evento principal

**Panel de diseño / caso de estudio:**

- Solución completa — restricciones, componentes, compensaciones (trade-offs), modos de fallo
- Las dimensiones de calidad que enfatiza la JD (ej. escalabilidad, cumplimiento, medibilidad)
- Nivel senior: establecer restricciones, hacer preguntas aclaratorias, dirigir la conversación

Calibra el plan según la ronda. Prepararse en exceso para un filtro desperdicia tiempo y crea la mentalidad equivocada.

**Panel Intel (cuando se nombra a los panelistas).** Si hay dos o más entrevistadores nombrados para esta ronda —indicados por el usuario directamente, en una invitación de calendario pegada o en un correo de agendamiento pegado—, construye la tabla de Panel Intel antes de pasar al Step 3. Consulta `modes/interview-prep.md` § "Panel Intel table" (bajo Step 4 → `panel-mixed`) para el formato completo de la tabla y los tres subcomportamientos (ponderación del decisor frente a la línea de reporte de la JD, lectura de la señal de trayectoria profesional, pregunta de cierre adaptada a cada panelista): aplica aquí esa misma lógica y usa después las etiquetas de audiencia resultantes para dimensionar los bloques del Step 3 por panelista, en lugar de preparar un único pack genérico. Un solo entrevistador nombrado no necesita la tabla; ve directo al Step 3, calibrado al tipo de ronda de esa persona indicado más arriba.

---

## Step 3 — Construir el Plan de Bloques de Tiempo

Calcula las horas disponibles desde ahora hasta la hora de la entrevista. Divide en bloques:

Antes de dimensionar los bloques, revisa `interview-prep/question-bank.md` (si existe). Cualquier pregunta marcada con 🔴 de una ronda anterior es una carencia comprobada — obtiene un bloque dedicado independientemente de cómo la clasifique el análisis CV-vs-JD. Los datos de rendimiento reales superan al riesgo inferido.

**Comprobación de investigación — antes de redactar el Bloque 4.** El Bloque 4 mapea historias a «tipos de pregunta probables», pero no dejes que eso derive en adivinar patrones cuando hay preguntas reales y reportadas a una comprobación de distancia:

1. **Comprueba primero si ya existe investigación con fuentes.** Si `interview-prep/{company-slug}-{role-slug}.md` ya existe (una ejecución previa de `interview-prep`), lee sus preguntas con fuente de los Step 1/Step 3 y reutilízalas directamente: nunca vuelvas a buscar trabajo que ya se ha hecho y citado.
2. **Si no existe ningún archivo de investigación previo, ejecuta directamente las consultas WebSearch del "Step 1 — Research" de `interview-prep.md`**, acotadas a la audiencia de esta ronda concreta (reclutador/RR. HH., hiring manager o panel técnico/de pares — ver el Step 2 más arriba) en lugar de la pasada completa de investigación de empresa.
3. **La misma disciplina de etiquetado que `interview-prep.md`:** las preguntas con fuente citan su fuente; todo lo que no se encuentre recurre a `[inferred from JD]`. No inventes una tercera etiqueta ni un formato de cita distinto (ver "Tag conventions" en `interview-prep.md`).
4. **Si la búsqueda realmente no arroja nada** (empresa poco conocida, sin reportes públicos de entrevistas), dilo explícitamente en la salida del plan y continúa con la inferencia por patrones de la JD y del perfil — el mismo principio de parcial-pero-honesto que `interview-prep.md` ya aplica a la información escasa, no el de todo-o-nada.

Esta es la contraparte proactiva de la ruta de investigación reactiva que `modes/interview/practice.md` ya ejecuta a mitad de sesión (ver su "When company-intel is thin mid-session"): la misma etapa de investigación, invocada aquí antes de redactar el plan en lugar de cuando el candidato se traba en directo.

**Plantilla (ajusta el tamaño de los bloques según el total de horas disponibles):**

```
Block 1 — Fija tu narrativa (primero, siempre)
  - Escribe explícitamente la cronología de tu trayectoria
  - Prepara el "por qué esta empresa" con una conexión concreta con tu historia
  - Prepara tu historia de proof point más fuerte (versión de 30 segundos)
  - Tiempo: ~15% de las horas disponibles

Block 2 — Tema de dominio prioritario (primero la brecha de mayor riesgo)
  - Un tema por bloque — no los mezcles
  - Para cada uno: concepto → tu gancho narrativo → preguntas de seguimiento probables
  - Tiempo: ~25% de las horas disponibles

Block 3 — Tema de dominio secundario
  - La segunda brecha de mayor riesgo
  - Tiempo: ~20% de las horas disponibles

Block 4 — Historias conductuales
  - Mapea las historias existentes a los tipos de pregunta probables — primero las que tienen fuente de la Comprobación de investigación anterior, y las de `[inferred from JD]` para cubrir las brechas restantes
  - Practica la versión verbal de 2 minutos de cada una
  - Prepara la Reflexión de cada una — el diferenciador del candidato sénior
  - Tiempo: ~15% de las horas disponibles

Block 5 — Investigación de empresa
  - Páginas de producto relevantes para el puesto
  - Conexión entre tu trayectoria y su dominio concreto
  - 3–4 preguntas afiladas para hacerles
  - Tiempo: ~10% de las horas disponibles

Block 6 — Simulacro de práctica (si da tiempo)
  - Una pregunta por tema probable — en voz alta y cronometrada
  - Tiempo: ~10% de las horas disponibles

Block 7 — Margen + descanso
  - Deja de estudiar 60–90 minutos antes de la entrevista
  - Empollar en la última hora añade ruido, no señal
  - Tiempo: el restante
```

Ajusta el tamaño de los bloques según la gravedad de la brecha y el tipo de ronda. Si es un screening, el Block 4 (conductual) y el Block 5 (investigación de empresa) son más importantes que los bloques de dominio profundo.

---

## Step 4 — Referencia Rápida de Prioridad

Al final del plan, produce una referencia rápida de una página que el candidato pueda leer 15 minutos antes de la entrevista:

```markdown
## 15-Minute Pre-Interview Review

**Your anchor sentence:** [una frase que capture por qué eres adecuado para este rol]

**Top 3 things to remember:**
1. [el mensaje más importante a dejarle al entrevistador]
2. [la pregunta más probable y tu primera frase de la respuesta]
3. [la conexión entre tu historia y su dominio]

**Compensación — ya tratada:** [solo si `--stated-for` devolvió observaciones previas] «Declaraste {amount} {currency} a {interviewer} el {date} en {round}. Mantén la coherencia salvo que algo material haya cambiado.» Omite este bloque por completo si no hay observaciones `stated` previas para este tracker# — no inventes una cifra que nunca se dijo.

**Your questions to ask:**
1. [pregunta 1]
2. [pregunta 2]
3. [pregunta 3]
```

---

## Step 5 — Guardar Resultados

Guarda el plan en `interview-prep/{company-slug}-{role-slug}.md` si el archivo no existe, o añade una sección `## Prep Plan` si ya existe.

---

## Rules

- **Calibra según la ronda.** Un plan de preparación para un filtro se ve muy diferente a uno para un panel de diseño. No apliques profundidad máxima por defecto para todas las entrevistas.
- **Las carencias primero.** El tiempo es finito. Las fortalezas del candidato no necesitan preparación — sus carencias sí.
- **Las carencias marcadas con 🔴 en el banco de preguntas tienen prioridad sobre las carencias inferidas.** Los datos de rendimiento reales superan el análisis CV-vs-JD. Si el candidato ya sabe que le cuesta un tema, no lo ocultes.
- **Un tema por bloque.** Mezclar temas en un solo bloque reduce la retención.
- **Siempre incluye tiempo de descanso.** Un candidato descansado supera a uno que ha estudiado de más en el último momento.
- **Nunca inventes información sobre la empresa.** Si no tienes investigación, dilo — no inventes afirmaciones sobre la cultura o detalles técnicos sobre la empresa.
- **Comprueba si hay preguntas reales reportadas antes del Block 4.** Reutiliza `interview-prep/{company-slug}-{role-slug}.md` si existe; si no, ejecuta las consultas del Step 1 de `interview-prep.md` acotadas a esta ronda. La misma disciplina de etiquetado que `interview-prep.md`: con fuente y cita, o `[inferred from JD]` cuando no aparezca nada real. Esta es la contraparte proactiva de "Never generate fake company intel" de más arriba: comprueba primero si existe lo real antes de recurrir a la inferencia.
- **Nunca inventes afirmaciones por el candidato.** La frase ancla y los puntos de conversación previos a la entrevista de la referencia rápida (Step 4) deben estar fundamentados en lo que el candidato tiene realmente: `cv.md`, `article-digest.md` o el banco de historias. No redactes afirmaciones que dependan de experiencia o métricas que el candidato no tiene. Si una afirmación aparece en `interview-prep/retracted-claims.md`, nunca la incluyas.
