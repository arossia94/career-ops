# AEIB Career-Ops

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/wordmark-dark.svg"><img src="docs/wordmark-light.svg" alt="career-ops" width="250" height="56"></picture></p>

<div align="center">

<p align="center"><picture><img src="docs/aeib_logo.png" alt="career-ops" width="250" height="29"></picture></p>

<div align="center">


[English](README.md) | [Español](README.es.md) |

<p align="center">
  <em>El IB te dio el conocimiento para triunfar en cualquier proceso de selección. AEIB Career-Ops te da la llave para entrar en ese proceso.</em>
</p>

<p align="center">
  <em>Este es un spin-off de <a href="https://github.com/santifer/career-ops">career-ops</a> adaptado para graduados del Instituto Balseiro (IB), distribuido a través de la Asociación de Ex-Alumnos del IB (AEIB).
  Personalizado por IBers, para IBers.
  </em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenCode-111827?style=flat&logo=terminal&logoColor=white" alt="OpenCode">
  <img src="https://img.shields.io/badge/Gemini_CLI-4285F4?style=flat&logo=google&logoColor=white" alt="Gemini CLI">
  <img src="https://img.shields.io/badge/Codex_(pronto)-6B7280?style=flat&logo=openai&logoColor=white" alt="Codex">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT">
  <a href="TRADEMARK.md"><img src="https://img.shields.io/badge/Trademark-Policy-blue.svg" alt="Trademark Policy"></a>
  <a href="https://discord.gg/S9zyz2CXZ"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord"></a>
  <br>
  <img src="https://img.shields.io/badge/EN-blue?style=flat" alt="EN">
  <img src="https://img.shields.io/badge/ES-red?style=flat" alt="ES">
  <img src="https://img.shields.io/badge/DE-grey?style=flat" alt="DE">
  <img src="https://img.shields.io/badge/FR-blue?style=flat" alt="FR">
  <img src="https://img.shields.io/badge/PT--BR-green?style=flat" alt="PT-BR">
  <img src="https://img.shields.io/badge/KO-white?style=flat" alt="KO">
  <img src="https://img.shields.io/badge/JA-red?style=flat" alt="JA">
  <img src="https://img.shields.io/badge/ZH--CN-red?style=flat" alt="ZH-CN">
  <img src="https://img.shields.io/badge/ZH--TW-blue?style=flat" alt="ZH-TW">
</p>

---

<p align="center">
  <img src="docs/demo.gif" alt="Career-Ops Demo" width="800">
</p>



<p align="center"><a href="https://discord.gg/S9zyz2CXZ"><img src="https://img.shields.io/badge/Unete_a_la_comunidad-Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a></p>

## Que es esto

Career-Ops convierte cualquier CLI de IA en un centro de mando de busqueda de empleo. En vez de trackear aplicaciones en un spreadsheet, tienes un pipeline AI que:

- **Evalúa ofertas** con scoring estructurado A-F (10 dimensiones ponderadas)
- **Genera PDFs personalizados** -- CVs ATS-optimizados por oferta
- **Escanea portales** automaticamente (Greenhouse, Ashby, Lever, webs de empresas)
- **Procesa en batch** -- evalua 10+ ofertas en paralelo con sub-agentes
- **Trackea todo** en una fuente de verdad unica con checks de integridad

> **Importante: Esto NO es para spamear empresas.** Career-ops es un filtro -- te ayuda a encontrar las pocas ofertas que merecen tu tiempo entre cientos. El sistema recomienda no aplicar a nada por debajo de 70.0/100, y recomienda encarecidamente no aplicar a nada por debajo de 50.0/100. Tu tiempo es valioso, y el del recruiter tambien. Siempre revisa antes de enviar.

Career-ops es agéntico: Claude Code navega páginas de empleo con Playwright, evalúa el ajuste razonando sobre tu CV vs. la descripción del puesto (no matching de keywords), y adapta tu CV para cada oferta.

> **Aviso: las primeras evaluaciones no seran buenas.** El sistema no te conoce todavia. Dale contexto -- tu CV, tu historia profesional, tus proof points, tus writing samples, tus preferencias, en que eres bueno, que quieres evitar. Cuanto mas lo nutras, mejor filtra. Piensa en ello como hacer onboarding a un recruiter nuevo: la primera semana necesita conocerte, luego se vuelve invaluable.

`career-ops` fue originalmente construido y usado para evaluar 740+ ofertas de empleo, generar 100+ CVs personalizados, y conseguir un rol de Head of Applied AI. [Lee el ejemplo completo](https://santifer.io/career-ops-system).

Esta versión adaptada para ex-alumnos del IB nació de la voluntad de sus desarrolladores principales de dar un salto grande en sus carreras, y hoy se usa para buscar empleo en EE. UU. y Europa.
La idea central de esta personalización es hacerla más precisa y mejor adaptada a roles altamente técnicos y especializados, sin perder la flexibilidad y apertura que ayudan a cambiar de industria o sector. En este mercado laboral tan competitivo, hoy dominado por IA en ambos extremos (candidato y reclutador), esta herramienta puede darle una ventaja crucial a los ex-alumnos del IB, en particular a los recién graduados, para conseguir su primer puesto o el trabajo de sus sueños.

## Features

| Feature | Descripcion |
|---------|-------------|
| **Auto-Pipeline** | Pega una URL, obtiene evaluacion + PDF + entrada en tracker |
| **Evaluacion A-F** | Resumen del rol, match con CV, estrategia de nivel, research de comp, personalizacion, prep de entrevista (STAR+R) |
| **Banco de historias** | Acumula historias STAR+Reflexion entre evaluaciones -- 5-10 historias maestras que responden cualquier pregunta behavioral |
| **Scripts de negociacion** | Frameworks de negociacion salarial, pushback de descuentos geograficos, leverage de ofertas competidoras |
| **PDFs ATS** | CVs con keywords inyectados, diseño Space Grotesk + DM Sans |
| **Scanner de portales** | 45+ empresas pre-configuradas (Anthropic, OpenAI, ElevenLabs, Retool, n8n...) + queries en Ashby, Greenhouse, Lever, Wellfound |
| **Batch** | Evaluacion en paralelo con workers `claude -p` |
| **Dashboard TUI** | Terminal UI para navegar, filtrar y ordenar tu pipeline |
| **Human-in-the-Loop** | La IA evalua y recomienda, tu decides y actuas. El sistema nunca envia una aplicacion -- tu siempre tienes la ultima palabra |
| **Integridad de pipeline** | Merge automatico, dedup, normalizacion de estados, health checks |

## Inicio rapido

```bash
# 1. Clonar e instalar
git clone https://github.com/arossia94/career-ops.git
cd career-ops && npm install
npx playwright install chromium   # Necesario para generar PDFs

# 2. Verificar setup
npm run doctor                     # Valida todos los prerequisitos

# 3. Configurar
cp config/profile.example.yml config/profile.yml  # Editar con tus datos
cp templates/portals.example.yml portals.yml       # Personalizar empresas

# 4. Añadir tu CV
# Crear cv.md en la raiz del proyecto con tu CV en markdown

# 5. Personalizar con Claude
claude   # Abrir Claude Code en este directorio

# Pidele a Claude que adapte el sistema a ti:
# "Cambia los arquetipos a roles de backend"
# "Traduce los modes a ingles"
# "Añade estas empresas a portals.yml"
# "Actualiza mi perfil con este CV que te pego"
# "Añade estas preguntas que recibí en una entrevista al banco de preguntas"

# 6. Usar
# Pega una URL de oferta o ejecuta /career-ops
```

> **El sistema esta diseñado para que Claude lo personalice.** Modes, arquetipos, scoring, scripts de negociacion -- solo pidelo. Claude lee los mismos archivos que usa, asi que sabe exactamente que editar.

Guia completa en [docs/SETUP.md](docs/SETUP.md).

## Integración con Gemini CLI

Career-ops soporta [Gemini CLI](https://github.com/google-gemini/gemini-cli) de forma nativa — igual que Claude Code y OpenCode. Los 15 slash commands están disponibles, usando la misma lógica de evaluación en `modes/*.md`.

### Opción A — Gemini CLI nativo (Recomendado)

```bash
# 1. Instalar Gemini CLI
npm install -g @google/gemini-cli
# o: npx @google/gemini-cli --version

# 2. Autenticar (gratis — usa tu cuenta de Google)
gemini auth

# 3. Ejecutar en el directorio de career-ops
cd career-ops
gemini

# 4. Usar los slash commands igual que en Claude Code
/career-ops "Senior AI Engineer en Anthropic..."
/career-ops-evaluate --file ./jds/openai.txt
/career-ops-scan
/career-ops-pdf
/career-ops-tracker
```

El archivo `GEMINI.md` se carga automáticamente como contexto. Los 15 comandos están definidos en `.gemini/commands/*.toml`.

### Opción B — Script standalone por API (sin instalar el CLI)

```bash
# 1. Consigue una API key gratis en https://aistudio.google.com/apikey
cp .env.example .env
# Edita .env → configura GEMINI_API_KEY=tu_clave_aqui

# 2. Instalar dependencias
npm install

# 3. Evaluar una descripción de puesto
node gemini-eval.mjs "Buscamos un Senior AI Engineer..."
node gemini-eval.mjs --file ./jds/mi-oferta.txt
npm run gemini:eval -- "Texto del JD aquí"
```

> **Nivel gratuito:** Ambas opciones funcionan sin facturación. El CLI nativo usa OAuth de Google; el script de API usa `gemini-2.0-flash` (15 RPM, 1M tokens/día gratis).

## Uso

Career-ops es un unico slash command con multiples modos:

```
/career-ops                → Mostrar todos los comandos
/career-ops {pega un JD}   → Pipeline completo (evaluar + PDF + tracker)
/career-ops scan           → Escanear portales
/career-ops pdf            → Generar CV ATS-optimizado
/career-ops batch          → Evaluar ofertas en batch
/career-ops tracker        → Ver estado de aplicaciones
/career-ops apply          → Rellenar formularios con IA
/career-ops pipeline       → Procesar URLs pendientes
/career-ops contacto       → Mensaje LinkedIn outreach
/career-ops deep           → Research profundo de empresa
/career-ops training       → Evaluar un curso/certificación
/career-ops project        → Evaluar un proyecto de portfolio
/career-ops interview-prep → Generar documento de preparación de entrevista específico por empresa
```

O simplemente pega una URL o descripcion de oferta -- career-ops la detecta y ejecuta el pipeline completo.

## Como funciona

```
Pegas una URL o descripcion de oferta
        │
        ▼
┌──────────────────┐
│  Deteccion de    │  Clasifica: LLMOps / Agentic / PM / SA / FDE / Transformation
│  Arquetipo       │
└────────┬─────────┘
         │
┌────────▼─────────┐
│  Evaluacion A-F  │  Match, gaps, comp research, historias STAR
│  (lee cv.md)     │
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
 Report  PDF  Tracker
  .md   .pdf   .tsv
```

## Portales incluidos

El scanner viene con **45+ empresas** pre-configuradas y **19 queries** en los principales portales de empleo. Copia `templates/portals.example.yml` a `portals.yml` y añade las tuyas:

**AI Labs:** Anthropic, OpenAI, Mistral, Cohere, LangChain, Pinecone
**Voice AI:** ElevenLabs, PolyAI, Parloa, Hume AI, Deepgram, Vapi, Bland AI
**Plataformas AI:** Retool, Airtable, Vercel, Temporal, Glean, Arize AI
**Contact Center:** Ada, LivePerson, Sierra, Decagon, Talkdesk, Genesys
**Enterprise:** Salesforce, Twilio, Gong, Dialpad
**LLMOps:** Langfuse, Weights & Biases, Lindy, Cognigy, Speechmatics
**Automatizacion:** n8n, Zapier, Make.com
**Europa:** Factorial, Attio, Tinybird, Clarity AI, Travelperk

**Portales de empleo:** Ashby, Greenhouse, Lever, Wellfound, Workable, RemoteFront

## Sistema de Evalauación de ofertas laborales.

El Agente de IA evalúa la oferta laboral respecto al CV de acuerdo a las reglas en `career-ops/modes/ofertas.md.`

Estas reglas tienen dos componentes: una matriz de puntuación suplementada por instrucciones adicionales.

### Matriz de Puntuación

Hay una matriz de puntuación de 10 dimensiones pesadas que evalúa la calidad de la oferta laboral y, sobre todo, la idoneidad del CV. 
Las 10 dimensiones, junto a los pesos predefinidos son:
**Alineación**: Cercanía entre el rol ofrecido y el objetivo (20%).
**Idoneidad del CV**: Cuán bien se ajusta el CV del usuario a lo requerido por la oferta laboral (30%).
**Senioridad**: Cuán senior es el rol ofrecido, favoreciendo roles más senior (5%).
**Competitividad**: Competitividad aproximada del candidato para el rol (10%).
**Oportunidades de crecimiento laboral**: Si el rol ofrece oportunidades de crecimiento dentro de la misma compañía (10%).
**Trabajo remoto**: Qué nivel de trabajo remoto es permitido (0%).
**Reputación del empleador**: Mayor puntuación para empresas top (5%).
**Modernidad tecnológica**: Para evitar trabajar con tecnologías anticuadas (5%).
**Velocidad del proceso de selección**: Auto explicativo (5%).
**Señales culturales**: Privilegia ofertas de compañías con una cultura "builder" y evita compañías con mucha burocracia interna (0%).

Los pesos de cada dimensión fueron elegidos de acuerdo a la preferencia de los autores y no deben ser tomados como una recomendación. Alentamos a los usuarios a cambiar estos pesos de acuerdo a sus preferencias, e incluso a jugar con los criterios definidos en la matriz. Todo esto puede ser modificado fácilmente al editar ´career-ops/modes/ofertas.md.´

El puntaje final es en una escala lineal de 0 (peor) a 100 (mejor).

### Instrucciones Adicionales


El archivo ´career-ops/modes/ofertas.md´ incluye instrucciones adicionales basadas en nuestro conocimiento de los sistemas ATS típicos utilizados por los reclutadores. Estas instrucciones son:

-**Fallo en requisitos mínimos**: Si el CV no cumple explícitamente con los requisitos mínimos de la descripción del puesto, se espera que los sistemas de reclutamiento lo descarten automáticamente. Por lo tanto, en este caso, el puntaje total quedará limitado a 50.
-**Palabras clave faltantes**: Si la descripción del puesto tiene palabras clave explícitas, el puntaje total se reducirá en 5 puntos por cada palabra clave ausente en el CV.

Alentamos al usuario a editar estas instrucciones según su caso personal y preferencias.

## Dashboard TUI

El dashboard integrado en terminal te permite navegar tu pipeline visualmente:

```bash
cd dashboard
go build -o career-dashboard .
./career-dashboard --path ..
```

Features: 6 pestañas de filtro, 4 modos de ordenacion, vista agrupada/plana, previews lazy-loaded, cambios de estado inline.

## Estructura del proyecto

```
career-ops/
├── AGENTS.md                    # Instrucciones canónicas del agente (todos los CLIs)
├── CLAUDE.md                    # Wrapper Claude Code (importa AGENTS.md)
├── cv.md                        # Tu CV (crealo tu)
├── article-digest.md            # Tus proof points (opcional)
├── config/
│   └── profile.example.yml      # Template para tu perfil
├── modes/                       # 14 modos
│   ├── _shared.md               # Contexto compartido (personalizable)
│   ├── oferta.md                # Evaluacion individual
│   ├── pdf.md                   # Generacion de PDF
│   ├── scan.md                  # Scanner de portales
│   ├── batch.md                 # Procesamiento batch
│   └── ...
├── templates/
│   ├── cv-template.html         # Template de CV ATS-optimizado
│   ├── portals.example.yml      # Config del scanner
│   └── states.yml               # Estados canonicos
├── batch/
│   ├── batch-prompt.md          # Prompt autocontenido del worker
│   └── batch-runner.sh          # Script orquestador
├── dashboard/                   # Visor de pipeline en Go TUI
├── data/                        # Tus datos de tracking (gitignored)
├── reports/                     # Reports de evaluacion (gitignored)
├── output/                      # PDFs generados (gitignored)
├── interview-prep/              # Archivos para prepararte para entrevistas (gitignored)
├── fonts/                       # Space Grotesk + DM Sans
├── docs/                        # Setup, personalizacion, arquitectura
└── examples/                    # CV de ejemplo, report, proof points
```

## Tech Stack

![Claude Code](https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Bubble Tea](https://img.shields.io/badge/Bubble_Tea-FF75B5?style=flat&logo=go&logoColor=white)

- **Agente**: Claude Code con skills y modos personalizados
- **PDF**: Playwright/Puppeteer + template HTML
- **Scanner**: Playwright + Greenhouse API + WebSearch
- **Dashboard**: Go + Bubble Tea + Lipgloss (tema Catppuccin Mocha)
- **Datos**: Tablas Markdown + config YAML + ficheros TSV batch

## Sobre los autores

Esta herramienta agéntica de IA es un spin-off del [career-ops](https://github.com/santifer/career-ops) original, desarrollado primero por [Santiago "santifer" Fernández de Valderrama Aparicio](https://santifer.io). Estamos muy agradecidos a Santiago y a la gran comunidad de desarrolladores del `career-ops` original, sin los cuales no habríamos podido hacer esto en tan poco tiempo.

La idea original del proyecto y los desarrolladores principales de esta versión personalizada para IB Alumni son,

- [Federico Baravalle](https://fbaravalle.com) -- Ingeniero Mecánico (IB14) con amplia experiencia en Argentina e Italia, fundador, apasionado por la Physical AI y la robótica.
- [Dr. Alejo N. Rossia](https://www.linkedin.com/in/alejo-rossia-2a1881225/) -- Físico (IB14) con amplia experiencia en investigación de física teórica de altas energías, estadística, ciencia de datos, desarrollo de software científico y ML.

## Documentacion

- [SETUP.md](docs/SETUP.md) -- Guía de instalacion
- [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) -- Como personalizar
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) -- Como funciona el sistema

## Aviso legal

**career-ops es una herramienta local y open source — NO un servicio alojado.** Al usar este software, aceptas que:

1. **Tu controlas tus datos.** Tu CV, datos de contacto e informacion personal se quedan en tu maquina y se envian directamente al proveedor de IA que elijas (Anthropic, OpenAI, etc.). No recopilamos, almacenamos ni tenemos acceso a tus datos.
2. **Tu controlas la IA.** Los prompts por defecto instruyen a la IA a no enviar aplicaciones automaticamente, pero los modelos pueden comportarse de forma impredecible. Si modificas los prompts o usas otros modelos, lo haces bajo tu responsabilidad. **Revisa siempre el contenido generado antes de enviarlo.**
3. **Tu cumples con los terminos de terceros.** Debes usar esta herramienta de acuerdo con los Terminos de Servicio de los portales de empleo (Greenhouse, Lever, Workday, LinkedIn, etc.). No uses esta herramienta para spamear empresas.
4. **Sin garantias.** Las evaluaciones son recomendaciones, no verdad absoluta. Los modelos pueden inventar habilidades o experiencia. Los autores no son responsables de resultados laborales, candidaturas rechazadas, restricciones de cuenta ni ninguna otra consecuencia.

Ver [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) para mas detalles. Este software se proporciona bajo la [Licencia MIT](LICENSE) "tal cual", sin garantia de ningun tipo.

## Contribuidores

<a href="https://github.com/arossia94/career-ops/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=arossia94/career-ops" />
</a>

¿Conseguiste trabajo usando career-ops? [¡Comparte tu historia!](https://github.com/arossia94/career-ops/issues/new?template=i-got-hired.yml)

## Licencia y Marca

El código está licenciado bajo [MIT](LICENSE). El nombre y la marca "career-ops" se rigen por la [Política de Marca](TRADEMARK.md) — permisiva para uso comunitario, reservada para nombres de productos comerciales y respaldo.

## Conectemos

[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/S9zyz2CXZ)
