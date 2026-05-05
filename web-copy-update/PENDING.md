# PENDING — bloqueos y decisiones tras los sprints

**De:** Claude Code
**Para:** Alejandro
**Fecha:** 2026-05-05
**Bundle aplicado:** `00-global` · `01-home` · `02-solutions` · `03-start` · `05-about` · `06-blog` (todo). `04-use-cases` eliminado por decisión tuya — la página ya no existe.

Todos los commits están en `main`, locales (sin push), pasando lint, format, 57 tests y build local.

---

## Sigue abierto — necesita tu/Cristian para cerrarlo

### 1. Widget flotante "Hablar con un agente" (sección 0.5 del brief)

No toqué `AgentFloatButton.tsx`. El brief pedía confirmar qué hace ese botón hoy antes de decidir mantener/eliminar. Si conecta con un asistente IA genérico, contradice la nueva narrativa de "no vendemos IA en el headline" y el brief recomienda quitarlo.

**Acción:** confirmar qué hace y decidir.

### 2. Descripciones cortas de los 13 módulos (home 1.4 + sidebar de /solutions)

El brief no las daba. Las escribí yo. Revisa y dime si alguna no encaja:

- **Customer Service**: Atiende al cliente con calidad humana 24/7. Bots que resuelven consultas básicas y escalan al equipo cuando importa.
- **Bookings**: Reservas, recordatorios y reprogramaciones en automático. Llena la agenda sin que nadie pase tiempo al teléfono.
- **Customer Success**: Onboarding, predicción de bajas y upsell. Mantén y haz crecer la cuenta sin perseguirla.
- **Sales**: Prospección, scoring y seguimiento. El equipo dedica el tiempo a cerrar, no a perseguir.
- **Marketing**: Contenido, email y social que escalan sin que el equipo se multiplique.
- **Product**: Feedback, uso y priorización con datos. Decide qué construir con evidencia, no con intuición.
- **Operations**: Proveedores, entregas, mantenimiento y SLAs. Operación coordinada sin Excel ni WhatsApp.
- **Inventory** (id `stock`): Reposición, alertas, liquidación y previsión de demanda. Inventario que se gestiona casi solo.
- **IT**: Accesos, dispositivos y soporte interno. Menos tickets repetitivos, más tiempo para lo importante.
- **Finance**: Facturación, cobros, conciliación y alertas de presupuesto. Cierre mensual sin sobresaltos.
- **HR & Recruitment**: Selección, onboarding, fichaje y offboarding. RR.HH. escala sin crecer al ritmo del headcount.
- **Legal**: Plantillas, revisiones y cumplimiento. Lo legal deja de ser cuello de botella en cada operación.
- **Management**: Reportes, OKRs y alertas accionables. Decisiones con datos en lugar de intuición.

### 3. Automatización por testimonial (home 1.6)

El brief pedía cualificar cada pie con "Automatización: X". No me pasaste la lista, así que la inferí del propio quote del testimonial:

| # | Cliente | Automatización (ES) |
|---|---------|---------------------|
| 1 | Albet Clínica Veterinària (Pere Coma) | Recordatorios de citas |
| 2 | Mayoral Studio (Eva Mayoral) | Recepcionista IA |
| 3 | Estructuras Albuixech (José A. González) | Recepcionista IA |
| 4 | Altipesa (Andrés Peralta) | Recepcionista IA B2B |
| 5 | KTL Escaleras (Andrés Peralta) | Recepcionista IA B2B |
| 6 | Novify (Angélica Ortega) | Implementación a medida *(quote genérica, sin automatización concreta)* |
| 7 | Albet (Carles Viladecans) | Gestión de incidencias en almacén |
| 8 | Can Cuinat (Ezequiel Garcia) | Recepcionista IA + cualificación de leads |
| 9 | Unlocked (Eric Alvarez) | Recepcionista IA omnicanal |
| 10 | HoHomes (Miquel Sesplugues) | Reservas + check-in automatizado |
| 11 | iZuuk (Samuel Pablos) | Prospección IA |

---

## Limpieza técnica (no bloquea, conviene cerrarlo)

### 4. `GOOGLE_API_KEY` ya no se usa

El código ya no la lee (la pipeline de IA se eliminó al borrar el formulario de reporte de /use-cases). No toqué `.env` local ni el panel de Vercel. **Acción:** borrar de ambos lados.

### 5. Token de Notion inválido

Durante `pnpm build` aparecen errores 401 de `@notionhq/client` (`API token is invalid`). El build pasa OK y `/blog` se genera, pero ensucia los logs. Es problema previo, no de este trabajo. **Acción:** regenerar el token de Notion en `.env` local + Vercel, o quitar la integración si no se va a usar.

---

## Decisiones documentadas (informativo — no requieren acción)

### 6. Métricas agregadas en home 1.5 (deviación consciente del brief)

El brief original prohibía explícitamente publicar métricas sin atribución por nombre de cliente. Confirmaste por chat que prefieres reponer la sección con métricas generales (12% facturación · 7x ROI · 34% ahorro costes · 50% ahorro tiempo) en formato honesto, hasta que salgan los case-studies derivados de testimoniales. La sección incluye disclaimer al pie. **Si en revisión externa lo cuestionan, queda trazado aquí que la decisión fue tuya y consciente.**

### 7. Em-dashes del brief → comas/dos puntos

Por preferencia documentada (sin em-dash en UI), traduje los em-dashes del brief a comas, dos puntos o frases cortas en al menos 3 sitios: hero del home ("pero no quieren, ni necesitan, meterse en SAP"), about 5.2 ("Tres profesionales: marketing, ingeniería y estrategia."), y start step 03 ("no hay motivo para seguir. Y nosotros tampoco para venderte más.").

### 8. EN traducido por mí desde el copy ES

El brief solo daba ES. Las versiones EN de toda la web (hero, about, /solutions catalog, /start, módulos, descripciones de las 36 fichas, etc.) las escribí yo siguiendo el mismo tono. Si alguna línea EN suena artificial, dímelo y la repaso.

### 9. About 5.4 (valores/misión) no añadida

El brief 5.4 explícitamente decía "no añadir copy nuevo automáticamente, requiere conversación con Cristian y Alejandro". Lo respeté. La página About queda como Hero + "Donde todo empezó" + Team + FinalCTA.

### 10. Renombres en /solutions

- `customerSuccess.name` ES corregido de "Servicio al Cliente" → "Customer Success" (las automatizaciones bajo ese id eran de Customer Success, no Customer Service — era un mismatch antiguo).
- `stock.name` ES de "Stock" → "Inventario" (EN ya era "Inventory"). El id sigue siendo `stock` para no romper claves.
- Macroáreas: `backendOps` ES "Operaciones / Logística" → "Operaciones". `corporateSupport` ES "Corporativo / Soporte" → "Soporte corporativo". EN `clientFacing` "Customer Service" → "Customer-facing" (porque ahora Customer Service es un módulo, no la macroárea).
- En ES la macroárea "Atención al cliente" y el módulo nuevo "Atención al Cliente" son homófonos (solo cambia la mayúscula del primer término). Si te confunde, dime y le pongo otro nombre al módulo (p.ej. "Soporte al Cliente").

### 11. Forms de /start desde 5 a 3 campos

El brief decía mantener los campos del form. Tú me pediste menos fricción. Quedó: nombre, email, "¿Qué te trae aquí?" textarea. Eliminados: sector dropdown, automation multi-select. La cualificación por sector y por interés se hace en la conversación de 30 minutos.

### 12. /use-cases eliminado completo

Ruta, componentes, traducciones, sitemap, links del header/footer y CTA secundario del hero del home. La superficie de "casos reales" volverá cuando los case-studies estén firmados, probablemente como sección bajo /solutions o en una ruta nueva.

---

## SEO y posibles regresiones a vigilar

- La ruta `/use-cases` ya no existe. Si Vercel tiene tráfico cacheado o el sitemap viejo está en Google, devolverá 404. El sitemap actual no la incluye.
- La ruta `/use-cases/report` (que existió brevemente con la pipeline IA) tampoco existe.
- Las dependencias `@ai-sdk/google` y `ai` se removieron de `package.json` al desconectar la pipeline. Si algún workflow externo o script fuera de `src/` las importa, fallará.
