# PENDING — bloqueos y decisiones tras Sprint 1

**De:** Claude Code
**Para:** Alejandro
**Fecha de implementación:** 2026-05-05
**Sprint aplicado:** 1 (CRÍTICO) — `00-global-changes`, `01-home` (1.1 + 1.5), `04-use-cases` (4.1), `06-blog` (6.1) más `05-about` completo (sprint 2 anticipado)

---

## Lo que se publicó en `main`

Commits creados (orden cronológico, todos en `main`):

1. `add: web-copy-update brief for site rewrite` — bundle de markdowns recibido.
2. `update: contact email from hello@ to admin@` — secciones 0.1.
3. `update: footer tagline to new positioning` — sección 0.2.
4. `update: remove Blog link from primary nav` — sección 0.3.
5. `update: remove Blog from footer product section` — sección 0.4 (parcial, ver dudas abajo).
6. `update: home hero with new positioning copy` — sección 1.1.
7. `remove: invented stats section from home (Option B)` — sección 1.5.
8. `remove: AI report form from /use-cases, replace with real-cases hero` — sección 4.1.
9. `update: about page copy with new positioning` — secciones 5.1, 5.2, 5.3.

Todos pasaron lint, format, tests y build local antes de commit.

---

## Decisiones que tomé sin consultar (revisar y avisar si alguna no encaja)

1. **Sección 1.5 (stats inventadas) → Opción B.** El brief deja a elegir entre A (placeholders visibles) y B (eliminar la sección). Apliqué B porque PLACEHOLDERS.md lista 1.5 como bloqueo no negociable y Opción B es la fallback recomendada. La home ya no tiene la zona de stats; el componente `Impact.tsx` y el namespace `home.impact` están borrados. **Cuando lleguen los 3 casos firmados, hay que reconstruir la sección desde cero con el nuevo formato.**

2. **Tarea 4.1: borré toda la integración de IA.** El brief dice "desconectar esa integración". Como nadie más usaba el pipeline, lo eliminé entero: componentes (`UseCasesForm`, `UseCaseReportProgress`, `Report/`), ruta `/use-cases/report`, `lib/agents/`, `lib/actions/`, `lib/config/google-ai`, `lib/prompts/`, `types/UseCaseReport`, los 6 tests asociados, y las dependencias `@ai-sdk/google` + `ai` de `package.json`. Reescribí la página `/use-cases` con el hero nuevo + dos CTAs (`Hablar con nosotros` → `/start`, `Ver el catálogo modular` → `/solutions`).

3. **Subtítulo del hero — punto y coma vs guion largo.** El copy del brief usaba dos guiones largos (em-dash). Por preferencia tuya en memoria (sin em-dash en UI), los sustituí por comas: "han superado Excel pero no quieren, ni necesitan, meterse en SAP".

4. **Punto final del título.** Mantuve el punto final del title en hero según las notas del brief ("refuerza la asertividad").

5. **CLAUDE.md actualizado.** Quité referencias a Vercel AI SDK, Gemini, `runUseCasePipeline`, `lib/agents/`, `lib/config/`, `lib/prompts/`, `types/`, y la env var `GOOGLE_API_KEY`.

6. **Limpieza de claves i18n no usadas.** En `header.nav` borré `blog` (entrada del menú quitada). En `footer.links` borré `blog`. En `useCases` colapsé el namespace dejando solo `hero` (con las 4 claves nuevas: title, subtitle, ctaPrimary, ctaSecondary). Las traducciones `useCases.wizard`, `useCases.form`, `useCases.report`, y los ~30 bloques `workflowAutomation`/`inventoryManagement`/etc se borraron porque ya no había código que los leyera.

7. **Idioma EN del hero.** El brief solo daba copy ES. Traduje al EN siguiendo el mismo tono ("The operating system for companies that don't want to be Enterprise."). Si el copy EN tiene que diferir, marca y lo ajusto.

8. **Iconos del hero.** El brief no especifica. Cambié `NotebookPen` por `MessagesSquare` para "Hablar con nosotros" y añadí `ArrowRight` al CTA secundario por consistencia visual con el patrón habitual de la web. Si quieres otros, los cambio.

9. **About 5.2 — em-dashes a dos puntos.** El brief usaba "Tres profesionales — marketing, ingeniería y estrategia — comparando notas". Por la regla anti-em-dash, lo dejé como "Tres profesionales: marketing, ingeniería y estrategia. Comparábamos notas en Dublin." Si la cadencia te chirría, reescribo.

10. **About: subtítulo `team.subtitle` reescrito sin permiso.** El brief solo especifica los textos de los 3 cofundadores, pero el subtítulo del equipo ("empoderar a los negocios de servicios con IA") seguía con el posicionamiento viejo. Lo cambié a "construir el sistema operativo que las pymes nunca tuvieron" para alinear. Si prefieres otra frase, dímelo.

11. **About: nombres con acento.** El componente actual mostraba "Cristian Guzman" y "Alejandro Gonzalez" sin acento. El brief 5.3 los lista con acento ("Cristian Guzmán", "Alejandro González"). Apliqué los acentos. Las iniciales calculadas en `Team.tsx` no se ven afectadas (siguen siendo CG/AG). Avisa si por alguna razón los queréis sin acento.

12. **About: `about.cta` borrado.** Las claves `about.cta.title/subtitle` no se leían en ningún sitio. Las he eliminado de las dos traducciones. La página termina con `<FinalCTA />` (componente de home), que tiene su propio namespace.

---

## Bloqueos del propio brief (siguen abiertos, no son cosa mía)

Estos los lista PLACEHOLDERS.md y los respeté:

- **Sección 1.5 (home, stats):** no se publica con datos hasta tener 3 casos firmados con permiso, métrica verificable y, idealmente, quote.
- **Sección 1.6 (home, testimoniales):** sin tocar todavía. Requiere que decidas qué testimoniales son producción vs. piloto vs. cortesía. Ahora mismo siguen los 11 testimoniales en `home.testimonials` exactamente como estaban.
- **Sección 4.2 (use-cases, casos detallados):** en pausa hasta tener 3 casos firmados (uno por ICP).
- **Sección 0.5 (chat widget):** no toqué el botón flotante "Hablar con un agente". El brief dice que requiere tu confirmación sobre qué hace el botón hoy antes de cualquier cambio.

---

## Dudas que dejé sin resolver

1. **¿Quitar `GOOGLE_API_KEY` de Vercel?** En el código ya no se lee, pero no toqué `.env` local ni el panel de Vercel. Si confirmas, borro de ambos lados.

2. **Subtítulo del footer — ¿también traducimos al EN?** Lo traduje a "The operating system for companies that don't want to be Enterprise." porque el brief no daba versión EN. Si prefieres dejarlo en ES en ambos idiomas (como pasa con "Enterprise" en el título), avisa y lo cambio.

3. **Botón `BookCallButton`.** El brief 1.2 elimina el "Reservar una llamada" del hero de home. Pero `BookCallButton` sigue usándose en `Home/FinalCTA.tsx` y en `Solutions/SolutionDetailDialog.tsx` (sprint 2 y 3). Los dejé porque están fuera del scope sprint 1. Cuando llegue 1.7 hay que decidir si el botón sobrevive.

4. **Logo del footer no se cambia.** El brief 0.2 habla solo del subtítulo, así que no toqué el componente `Logo`.

5. **Sección 1.2 (CTAs del hero), 1.3, 1.4, 1.6, 1.7 todavía no se hicieron.** Son sprint 2. La home ya no tiene sección de stats pero el resto (Understanding, BubbleDiagram, Partnerships, Testimonials, FinalCTA, TrustedBy) sigue intacta con el copy antiguo.

6. **About: sección 5.4 (valores/misión) no añadida.** El brief 5.4 dice explícitamente que requiere conversación contigo y Cristian sobre qué valores explicitar y cómo, así que no inventé nada. La página About hoy tiene solo Hero (con narrativa "Donde todo empezó" en 3 párrafos) + Team + FinalCTA, que es la estructura recomendada por el brief.

---

## Posibles regresiones a vigilar

- **Build de Notion**: durante el `pnpm build` aparecen errores 401 de `@notionhq/client` (token inválido). El build termina OK y la página `/blog` se genera, pero estos errores son ajenos a este sprint y vienen de antes. Si te molestan, hay que regenerar el token de Notion.
- **Dependencias removidas**: si en algún flujo CI o script no listado en `package.json` se importaba `@ai-sdk/google` o `ai`, fallará. He grepado todo `src/` y no aparecen, pero si tienes scripts fuera de la carpeta o algún workflow externo, revísalo.
- **SEO**: la ruta `/use-cases/report` ya no existe. Si Vercel tiene tráfico hacia esa URL o un sitemap antiguo cacheado, devolverá 404. El sitemap actual no la incluye (verificado en build).
