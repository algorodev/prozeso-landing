# Reescritura de copy de prozeso.com

**Para:** Claude Code
**De:** Alejandro González (CTO)
**Fecha:** Mayo 2026

---

## Contexto del cambio

La web actual de Prozeso (https://prozeso.com) se posiciona como "automatización con IA conversacional para negocios de servicios". Después del memo de tesis firmado en mayo 2026, ese posicionamiento ha sido reemplazado por uno nuevo: **Prozeso es el sistema operativo de las empresas que no quieren ser Enterprise**.

Este bundle contiene el copy literal de toda la web reescrito para alinearse con la nueva tesis. Tu trabajo es localizar cada bloque en el código y sustituir el copy actual por el nuevo.

**No es solo un cambio de palabras.** Hay cambios estructurales: bloques que se eliminan, secciones que se reorganizan, y un email de contacto que cambia en todo el sitio. Los cambios estructurales están marcados con `[ACCIÓN ESTRUCTURAL]` para que no se pasen por alto.

---

## Convenciones del bundle

### Formato de cada archivo

Cada archivo markdown corresponde a una página de la web (ej. `01-home.md`, `02-solutions.md`). Dentro de cada archivo, cada sección sigue esta estructura:

```
## [N.M] Nombre de la sección

**Ubicación esperada en código:** descripción de dónde está
**Tipo de cambio:** SUSTITUIR / ELIMINAR / AÑADIR / REESTRUCTURAR

### Copy actual

> [texto literal actual]

### Copy nuevo

[texto literal nuevo, listo para pegar]

### Notas de implementación

- Detalles relevantes
```

### Placeholders

Cuando el copy nuevo necesita un dato que no podemos asumir (nombre de cliente, métrica, link), uso placeholders con la convención:

- `[PLACEHOLDER_CLIENTE_X]` — nombre de un cliente real, a confirmar
- `[PLACEHOLDER_METRICA_X]` — métrica concreta de un cliente, a verificar
- `[PLACEHOLDER_URL_X]` — URL de destino para un CTA o enlace
- `[PLACEHOLDER_ESTADO_X]` — estado de una automatización (en producción / roadmap / visión)

La tabla de todos los placeholders está al final de este README.

### Email de contacto

**CRÍTICO:** En toda la web aparece `hello@prozeso.com`. El correo correcto es `admin@prozeso.com`. Cambia en footers, formularios, mailto: y cualquier referencia.

---

## Orden de ejecución recomendado

Si vas a hacer commits separados, este es el orden de prioridad. Si haces todo en una pasada, ignora.

1. **Sprint 1 — esta semana (CRÍTICO)**
   - `00-global-changes.md` (email + subtítulo del footer en todas las páginas)
   - `01-home.md` secciones 1.1 (hero) y 1.4 (stats inventadas)
   - `04-use-cases.md` sección 4.1 (eliminar formulario de "reporte IA")

2. **Sprint 2 — dos semanas (ALTO)**
   - `01-home.md` resto de secciones
   - `03-start.md` completo
   - `02-solutions.md` hero y reorganización (sección 2.1 y 2.2)
   - `05-about.md` completo

3. **Sprint 3 — siguiente mes (MEDIO/BAJO)**
   - `02-solutions.md` reescritura de las 36 fichas (requiere clasificación previa por estado)
   - `04-use-cases.md` casos reales (requiere permisos de clientes)
   - `06-blog.md` ocultar del menú o publicar contenido

---

## Bloqueos conocidos

Hay tareas que requieren información que ni yo ni Cristian podemos darte sin más contexto. Si te encuentras con uno de estos bloqueos, **detente y avisa**:

1. **Clasificación de las 36 automatizaciones** por estado real (en producción / roadmap / visión). El archivo `02-solutions.md` deja un placeholder de estado en cada ficha que tenemos que rellenar antes de publicar.

2. **Casos de cliente publicables**. Necesitamos permiso explícito de cliente, datos verificables y, si es posible, una quote. Mientras no estén firmados, los placeholders se dejan visibles y la sección de casos no se publica.

3. **Métricas concretas**. Las métricas atribuidas a un cliente real solo se publican con el dato verificado y con la palabra correcta para describirlo (no "↑ 40%" sino "reducción documentada del 40%" con el caso identificado).

---

## Estructura del bundle

```
web-copy-update/
├── README.md                  ← este archivo
├── 00-global-changes.md       ← cambios que afectan a todo el sitio (footer, email)
├── 01-home.md                 ← prozeso.com/es
├── 02-solutions.md            ← /es/solutions (incluye las 36 fichas)
├── 03-start.md                ← /es/start
├── 04-use-cases.md            ← /es/use-cases
├── 05-about.md                ← /es/about
├── 06-blog.md                 ← /es/blog
└── PLACEHOLDERS.md            ← tabla maestra de placeholders por rellenar
```

---

## Reglas de oro

Estas son las reglas que el playbook SDR exige y que la web debe respetar:

1. **Nunca prometer en la web lo que no entregamos hoy.** Si una sección no se puede reescribir honestamente con la información que tenemos, mejor eliminarla que retocarla.

2. **No vendemos IA, vendemos resultados.** "IA" no aparece como diferenciador en titulares. Aparece como componente cuando es relevante explicar la implementación.

3. **Las métricas se atribuyen al cliente que las generó.** Sin atribución, no se publican.

4. **El ICP es amplio, no estrecho.** "Empresas de 10 a 200 empleados" — no "negocios de servicios". Industrial, distribución, hostelería, servicios profesionales, salud, inmobiliario.

5. **Tono comercial honesto.** "Si no encajamos, te lo decimos" sustituye a "transformaremos tu negocio".

---

## Si tienes dudas

Si un cambio no está claro, una sustitución entra en conflicto con código existente, o algo no encaja en el flujo de la web actual: **para y pregunta**. Mejor 30 minutos de aclaración que un commit que hay que revertir.

Para preguntas sobre copy, contexto o decisiones: pregunta a Alejandro.
Para preguntas sobre infraestructura, deploys o build: el flujo habitual.
