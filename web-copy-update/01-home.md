# 01 — Home (prozeso.com/es)

**URL:** https://www.prozeso.com/es
**Prioridad:** CRÍTICA — esta es la página de mayor impacto

---

## 1.1 Hero — Título principal y subtítulo

**Ubicación esperada en código:** primer bloque hero, encima del fold.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> # Haz que tu negocio trabaje para ti
>
> En Prozeso, desarrollamos automatizaciones, impulsadas por IA, que atienden llamadas y escalan cada interacción de tu negocio.

### Copy nuevo

```
# El sistema operativo de las empresas que no quieren ser Enterprise.

La columna vertebral donde viven los procesos, los datos y la operación de empresas que han superado Excel pero no quieren — ni necesitan — meterse en SAP.
```

### Notas de implementación

- El punto final en el título es deliberado: refuerza la asertividad del posicionamiento.
- "Enterprise" se queda en inglés intencionadamente — es el término que el ICP reconoce como la categoría que rechaza.

---

## 1.2 Hero — CTAs

**Ubicación esperada en código:** botones debajo del título hero.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> [Comenzar evaluación gratis] [Reservar una llamada]
>
> Prueba gratis · Sin tarjeta de crédito · Cancela cuando quieras

### Copy nuevo

```
[Hablar con nosotros]   [Ver cómo aplica a tu caso]

Sin compromiso · Conversación de 30 minutos · Te decimos si encajamos
```

### Notas de implementación

- "Hablar con nosotros" → enlaza a `/es/start`
- "Ver cómo aplica a tu caso" → enlaza a `/es/use-cases`
- ELIMINAR las frases "Prueba gratis", "Sin tarjeta de crédito", "Cancela cuando quieras" — sugieren un SaaS self-service que no somos.

---

## 1.3 Sección de arquitectura (las tres capas)

**Ubicación esperada en código:** segunda sección de la home, debajo del hero. La sección actual se titula "De entender a automatización inteligente" y muestra 4 bloques.
**Tipo de cambio:** REESTRUCTURAR (de 4 bloques a 3 + cierre)

### Copy actual

> ## De entender a automatización inteligente
> Cómo convertimos datos en impacto real.
>
> [Bloque 1] Convierte conversaciones en conocimiento real
> Analiza llamadas y mensajes para detectar patrones. Entiende qué ocurre y dónde se pierde valor.
>
> [Bloque 2] Transforma datos en decisiones accionables
> Visualiza métricas clave y detecta fugas de tiempo, calidad y dinero. Impulsa eficiencia y rentabilidad.
>
> [Bloque 3] Escala la eficiencia con IA conversacional
> Automatiza llamadas, información y reservas para liberar tiempo y aumentar ventas 24/7.
>
> [Bloque 4] Cumplimiento RGPD con seguridad empresarial
> Infraestructura cifrada de extremo a extremo para mantener privada la información de tu negocio y de tus clientes.

### Copy nuevo

```
## Tres capas. Una columna vertebral.

No es una herramienta. Es la forma en que tu empresa opera.

[Bloque 1 — etiqueta: Cómo entra la información]
### Capa de entrada
Voz, chat, WhatsApp, email, formularios, integraciones. Cualquier evento útil para tu empresa entra por donde el cliente o el equipo ya está. Sin pedirle a nadie que cambie cómo trabaja.

[Bloque 2 — etiqueta: Cómo se procesan los procesos]
### Capa de orquestación
Workflows multi-tenant, lógica de negocio, reglas, integraciones. El núcleo que conecta tu ERP, tu CRM, tus canales y tu equipo. Lo que convierte eventos sueltos en operación coordinada.

[Bloque 3 — etiqueta: Qué decide el sistema]
### Capa de inteligencia
Reportes, alertas, predicciones, optimizaciones. Decisiones, no solo tareas ejecutadas. Lo que justifica que sigas pagándonos al mes 12, no solo al mes 2.

---

[Bloque de cierre — etiqueta: Confianza operativa]
### Tus datos, en tu lado.
Infraestructura europea, cifrado en tránsito y en reposo, exportación completa en cualquier momento sin penalización. Cumplimiento RGPD por diseño.
```

### Notas de implementación

- La sección pasa de 4 bloques iguales a 3 bloques (las capas) + 1 bloque secundario de confianza/seguridad.
- Si el diseño actual usa 4 columnas iguales, sugerencia: las 3 capas en una fila destacada, el bloque de confianza más abajo o como un pie de sección.
- Los iconos asociados a cada bloque tienen que cambiar:
  - Capa de entrada → micrófono / WhatsApp / canal
  - Capa de orquestación → engranajes / nodos conectados
  - Capa de inteligencia → cerebro / gráfico / decisión
  - Confianza → escudo / candado

---

## 1.4 Sección "Cada área de tu negocio, automatizada"

**Ubicación esperada en código:** sección con tabs/cards de áreas de negocio (actualmente: Reservas, Marketing, Operaciones, Finanzas, Servicio al Cliente).
**Tipo de cambio:** REESTRUCTURAR

### Copy actual

> ## Cada área de tu negocio, automatizada
> Sin fricciones. Sin intervención manual. Con resultados medibles.
>
> [Reservas | Marketing | Operaciones | Finanzas | Servicio al Cliente]
>
> [Ver todas las automatizaciones]

### Copy nuevo

```
## Empezamos con una pieza. Acabamos siendo la columna vertebral.

Entramos por donde el dolor es agudo y el ROI es inmediato. A los 18 meses, tu empresa opera sobre Prozeso.

[Tabs / cards expandidos a 13 áreas funcionales:]

- Sales
- Marketing
- Operations
- Finance
- HR
- Customer Service
- Bookings
- Inventory
- IT
- Legal
- Management
- Product
- Customer Success

[Botón: Ver el catálogo modular] → /es/solutions
```

### Notas de implementación

- La home pasa de mostrar 5 áreas a las 13 del catálogo modular completo. Si visualmente 13 son demasiadas, agruparlas en 4 grandes grupos como hace `/solutions` actualmente:
  - **Atención al cliente:** Customer Service · Bookings · Customer Success
  - **Crecimiento:** Sales · Marketing · Product
  - **Operaciones:** Operations · Inventory · IT
  - **Soporte corporativo:** Finance · HR · Legal · Management
- Cada área debe tener una breve descripción de 1 línea. Para esos textos cortos, ver `02-solutions.md` que ya los incluye.
- El CTA "Ver todas las automatizaciones" cambia a "Ver el catálogo modular".

---

## 1.5 Sección de stats (CRÍTICO)

**Ubicación esperada en código:** la sección actual titulada "Conversaciones que generan impacto real", con los 3 stats (20% / 10x / 72%).
**Tipo de cambio:** REESTRUCTURAR — eliminar stats inventadas, sustituir por casos verificables

### Copy actual

> ## Conversaciones que generan impacto real
> Optimizamos cada llamada y cada interacción con IA de voz natural.
>
> 20% Facturación incremental
> 10x Retorno de la inversión
> 72% Ahorro de recursos

### Copy nuevo

```
## Resultados de los primeros clientes.

Magnitudes documentadas en pilotos y producción real con clientes identificados. No son media de mercado: es lo que hemos visto con quienes ya trabajan con nosotros.

[Bloque caso 1]
**[PLACEHOLDER_CLIENTE_1]**
[PLACEHOLDER_SECTOR_1] · [PLACEHOLDER_TAMANO_1]
"[PLACEHOLDER_QUOTE_1]"
→ [PLACEHOLDER_METRICA_1]

[Bloque caso 2]
**[PLACEHOLDER_CLIENTE_2]**
[PLACEHOLDER_SECTOR_2] · [PLACEHOLDER_TAMANO_2]
"[PLACEHOLDER_QUOTE_2]"
→ [PLACEHOLDER_METRICA_2]

[Bloque caso 3]
**[PLACEHOLDER_CLIENTE_3]**
[PLACEHOLDER_SECTOR_3] · [PLACEHOLDER_TAMANO_3]
"[PLACEHOLDER_QUOTE_3]"
→ [PLACEHOLDER_METRICA_3]
```

### Notas de implementación

- **CRÍTICO:** La sección actual con stats agregadas inventadas (20% / 10x / 72%) tiene que desaparecer **esta semana**. Si los placeholders de cliente todavía no están firmados:
  - **Opción A (preferida):** sustituir por la sección nueva con placeholders visibles. NO publicar hasta que estén rellenos.
  - **Opción B (fallback):** eliminar la sección entera y dejar la home sin esta zona hasta tener casos.
- No publicar **bajo ninguna circunstancia** la versión actual con los stats inventados. Es la deuda más urgente del sitio.

---

## 1.6 Sección de testimoniales

**Ubicación esperada en código:** carrusel de testimoniales de clientes.
**Tipo de cambio:** REORGANIZAR (no reescribir cada testimonial)

### Cambios

```
1. Reordenar: poner arriba los clientes con uso productivo confirmado y pago recurrente.
   Hacia abajo, pilotos y testimoniales de cortesía.

2. Eliminar duplicados: la lista actual repite testimoniales por cómo está estructurado el carrusel.

3. Cualificar el pie de cada testimonial. En lugar de:
   "Director de operaciones, [Empresa]"
   usar:
   "Director de operaciones, [Empresa] · Automatización: [recepcionista IA / gestión de pedidos por WhatsApp / etc.]"

4. Quitar los testimoniales que no podamos respaldar con un caso real verificable.
```

### Notas de implementación

- Esta sección requiere decisión interna de Alejandro y Cristian sobre qué testimoniales son producción vs. piloto vs. cortesía.
- El playbook SDR es claro: si no hay producción/pago, la cita no debería estar en la web pública.
- **Bloqueo:** marcar para revisión interna antes de publicar cambios.

---

## 1.7 CTA final de la home

**Ubicación esperada en código:** última sección antes del footer.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> ## ¿Listo para automatizar?
> Empieza tu evaluación gratuita hoy. Descubre exactamente qué automatizaciones transformarán tu negocio.
>
> [Comenzar evaluación gratis] [Reservar una llamada]

### Copy nuevo

```
## ¿Encaja con tu empresa?

Una conversación de 30 minutos es suficiente para saber si Prozeso te aporta más de lo que cuesta. Si no encajamos, te lo decimos.

[Hablar con nosotros]   [Ver el catálogo modular]
```

### Notas de implementación

- "Hablar con nosotros" → `/es/start`
- "Ver el catálogo modular" → `/es/solutions`
- El cambio de tono ("¿Encaja?" en lugar de "¿Listo para automatizar?") es deliberado: refleja la postura honesta del playbook SDR.
