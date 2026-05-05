# PENDING — bloqueos y decisiones tras Sprint 1

**De:** Claude Code
**Para:** Alejandro
**Fecha de implementación:** 2026-05-05
**Sprint aplicado:** 1 (CRÍTICO) + 2 (ALTO) + parte de 3 (`02-solutions` completo aplicado)

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
10. `update: home — reinstate aggregated stats (Impact section)` — sección 1.5 reabierta con métricas agregadas (decisión de Alejandro).
11. `update: qualify each testimonial with the automation in use` — sección 1.6.
12. `update: home final CTA to "does Prozeso fit your company?"` — sección 1.7.
13. `update: home architecture section to three layers + trust block` — sección 1.3.
14. `update: home areas section to 13 modules in 4 macro-groups` — sección 1.4.
15. `update: solutions hero and per-module structure` — secciones 2.1 + 2.2.
16. `update: rewrite /solutions catalog with new ficha pattern` — secciones 2.4 + 2.5 + redistribución de fichas + layout 1280px.

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

13. **Home 1.4: 4 áreas nuevas creadas (sin automatizaciones).** El brief añade Customer Service, Product, IT y Legal a las 9 que existían. Esas 4 áreas tienen entrada en `home.automationSuite.areas.*` con `name` + `shortDescription` + `tagline` + `automations: {}` vacío. En `/solutions`, el sidebar las muestra pero el grid las filtra (porque no hay automatizaciones). Esto se resolverá cuando hagamos sprint 2 de `02-solutions.md`. Mientras tanto, clicar en alguna de esas 4 áreas desde la home te lleva a `/solutions?group=...&area=...` y el grid sale vacío (no rota).

14. **Home 1.4: descripciones cortas inventadas por mí (13 áreas).** El brief no las daba. Estas son las que escribí (revisa y dime si alguna no te encaja):
    - **Customer Service**: "Atiende al cliente con calidad humana 24/7. Bots que resuelven consultas básicas y escalan al equipo cuando importa."
    - **Bookings**: "Reservas, recordatorios y reprogramaciones en automático. Llena la agenda sin que nadie pase tiempo al teléfono."
    - **Customer Success**: "Onboarding, predicción de bajas y upsell. Mantén y haz crecer la cuenta sin perseguirla."
    - **Sales**: "Prospección, scoring y seguimiento. El equipo dedica el tiempo a cerrar, no a perseguir."
    - **Marketing**: "Contenido, email y social que escalan sin que el equipo se multiplique."
    - **Product**: "Feedback, uso y priorización con datos. Decide qué construir con evidencia, no con intuición."
    - **Operations**: "Proveedores, entregas, mantenimiento y SLAs. Operación coordinada sin Excel ni WhatsApp."
    - **Inventory** (id `stock`): "Reposición, alertas, liquidación y previsión de demanda. Inventario que se gestiona casi solo."
    - **IT**: "Accesos, dispositivos y soporte interno. Menos tickets repetitivos, más tiempo para lo importante."
    - **Finance**: "Facturación, cobros, conciliación y alertas de presupuesto. Cierre mensual sin sobresaltos."
    - **HR & Recruitment**: "Selección, onboarding, fichaje y offboarding. RR.HH. escala sin crecer al ritmo del headcount."
    - **Legal**: "Plantillas, revisiones y cumplimiento. Lo legal deja de ser cuello de botella en cada operación."
    - **Management**: "Reportes, OKRs y alertas accionables. Decisiones con datos en lugar de intuición."

15. **Home 1.4: corregí mismatch en `customerSuccess` (ES).** En la versión anterior, `customerSuccess.name` en español decía "Servicio al Cliente" — pero las automatizaciones bajo ese id eran de Customer Success (onboarding de cliente, predicción de bajas, upsell, NPS). Ahora `customerSuccess` es "Customer Success" en ES (igual que en EN). El módulo "Atención al Cliente" pasa a ser el nuevo `customerService`. Esto reordena ligeramente la sidebar de `/solutions`.

16. **Home 1.4: `stock.name` cambia de "Stock" a "Inventario" en ES.** En EN ya era "Inventory". La id sigue siendo `stock` para no romper las claves de las 4 automatizaciones existentes (sprint 3 puede renombrar id si quieres).

17. **Grupos renombrados**: `backendOps` ES "Operaciones / Logística" → "Operaciones". EN "Operations / Logistics" → "Operations". `corporateSupport` ES "Corporativo / Soporte" → "Soporte corporativo". EN "Corporate / Support" → "Corporate support". `clientFacing` EN "Customer Service" → "Customer-facing" (ahora Customer Service es un módulo concreto, no la macroárea). En ES `clientFacing` se queda como "Atención al cliente" (la macroárea) y el módulo nuevo se llama "Atención al Cliente" — son distintos en mayúscula del primer término, pero homófonos. **Si te genera confusión, dime y le pongo otro nombre al módulo (p.ej. "Soporte al Cliente").**

18. **Home 1.6: testimoniales — todos a producción.** Confirmaste por mensaje que los 11 son producción, así que no hubo reordenación ni eliminación. Los "duplicados" que mencionaba el brief son la duplicación intencional para el efecto marquee (`loop = [...items, ...items]`); no es contenido repetido en BD, no se toca.

19. **Home 1.5 reabierta — métricas agregadas (deviación consciente del brief).** Antes apliqué la Opción B (eliminar la sección entera). Después confirmaste por chat que prefieres reponer la sección con **métricas generales agregadas** ahora, y dejar los casos individuales atribuidos para cuando salgan los case-studies derivados de los testimoniales. Aplicado:

    - Sección nueva con 4 stats: 12% facturación incremental · 7x ROI · 34% ahorro de costes · 50% ahorro de tiempo. Layout 2x2 en mobile, 4-en-fila en lg.
    - Framing honesto: título "Resultados medios con clientes en producción.", subtítulo explica que son magnitudes agregadas y que los casos individuales llegan pronto. Disclaimer al pie: "Magnitudes promedio observadas en los clientes con módulos en producción. No representan media de mercado."
    - **No hay quotes inventadas atribuidas a "una red de concesionarios" / "una cadena de restaurantes" como en la versión vieja.** Solo número + título + descripción. Cuando lleguen los case-studies con permiso, se reemplaza este bloque por bloques tipo Caso 1/Caso 2/Caso 3 (formato del brief original 1.5).
    - **Caveat respecto al brief**: el brief explícitamente dice "Las métricas se atribuyen al cliente que las generó. Sin atribución, no se publican." y "No publicar bajo ninguna circunstancia la versión actual con los stats inventados". Esta sección, aunque honesta en framing, sigue siendo agregada sin atribución por nombre. Tú confirmaste la decisión sabiendo el conflicto. Documentado aquí para que si Cristian o auditoría externa lo cuestionan, esté trazado.

20. **/solutions sprint 3 — todo "en producción", sin casos atribuidos.** Confirmaste que las 36 fichas son "en producción", sin desglose de casos por ficha (la línea "Casos en producción: cliente X, cliente Y" del brief queda diferida a la superficie futura de case-studies). Ningún roadmap; los 4 módulos sin automatizaciones (product, it, legal, management) muestran "Disponible Q4 2026" + un placeholder discreto explicando que el módulo está en desarrollo.

21. **/solutions: redistribución de fichas para que coincidan con el módulo correcto.** Tu mensaje del 5 de mayo: las 4 fichas que estaban en `customerService` se han partido — Recepcionista IA se queda en Customer Service (1 ficha), y Recordatorios de citas, Impulsor de reseñas y Reprogramación inteligente pasan a Bookings (3 fichas). Bookings deja de estar en "Disponible Q4 2026". Los 4 módulos vacíos siguen siendo product, it, legal y management.

22. **/solutions: descripciones por ficha tomadas tal cual del brief 2.4.** No las inventé — son las del bundle. Pero las **traducciones EN sí las escribí yo** (el brief solo daba ES). Si quieres revisar alguna línea EN, está en `src/messages/en.json` bajo `home.automationSuite.areas.{id}.automations.{i}.description`.

23. **/solutions: subtitle por ficha mantenido aunque el brief no lo pedía explícitamente.** Cada ficha conserva un `subtitle` corto (ej. "Voice & WhatsApp", "Lifecycle", "Cash flow") porque añade contexto sin alargar la card. Si te parece ruido visual, dímelo y lo quito de las 36.

24. **Home 1.6: automatización por testimonial inferida del propio quote.** El brief pide cualificar cada pie con "Automatización: X". No me pasaste la lista, así que la inferí. Revisa y dime cuál cambiar:

    | # | Cliente | Quote menciona | Automatización (ES) |
    |---|---------|----------------|---------------------|
    | 1 | Albet Clínica Veterinària (Pere Coma) | "no shows reducidos 40%, recordatorios un día antes" | Recordatorios de citas |
    | 2 | Mayoral Studio (Eva Mayoral) | "20 llamadas/día fuera de horario, lista de espera automática" | Recepcionista IA |
    | 3 | Estructuras Albuixech (José A. González) | "gestión de llamadas y seguimientos" | Recepcionista IA |
    | 4 | Altipesa (Andrés Peralta) | "consultas de distribuidores, catálogo, stock, plazos" | Recepcionista IA B2B |
    | 5 | KTL Escaleras (Andrés Peralta) | "respuestas rápidas sobre pedidos, plazos, especificaciones" | Recepcionista IA B2B |
    | 6 | Novify (Angélica Ortega) | quote genérica de la experiencia con Prozeso | **Implementación a medida** *(no menciona automatización concreta — si quieres cambiarlo a una específica, dime cuál)* |
    | 7 | Albet (Carles Viladecans) | "logística, incidencias en almacén en tiempo real" | Gestión de incidencias en almacén |
    | 8 | Can Cuinat (Ezequiel Garcia) | "atender nuevos leads y cualificarlos cuando no estamos" | Recepcionista IA + cualificación de leads |
    | 9 | Unlocked (Eric Alvarez) | "comunicación de eventos, mensajes en todos los canales" | Recepcionista IA omnicanal |
    | 10 | HoHomes (Miquel Sesplugues) | "captación de leads + check-in/out de huéspedes" | Reservas + check-in automatizado |
    | 11 | iZuuk (Samuel Pablos) | "generación de leads cualificados con seguridad empresarial" | Prospección IA |

    El componente `Testimonials.tsx` ahora pinta una tercera línea pequeña debajo del rol con formato "Automatización: X" (en EN: "Automation: X"). Usa una nueva clave `home.testimonials.automationLabel`.

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
