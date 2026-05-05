# 00 — Cambios globales

**Aplica a:** todas las páginas del sitio

Estos cambios afectan a componentes compartidos. Hay que aplicarlos una vez en el componente raíz (footer, layout, etc.) y se propagarán automáticamente.

---

## 0.1 Email de contacto en todo el sitio

**Ubicación esperada en código:** componente `Footer`, formularios de contacto, cualquier `mailto:` en el código.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> hello@prozeso.com

### Copy nuevo

```
admin@prozeso.com
```

### Notas de implementación

- Buscar todas las apariciones de `hello@prozeso.com` en el repo (texto plano + atributos `mailto:`).
- También revisar variables de entorno o ficheros de configuración por si el email está parametrizado.
- Esta es la prioridad más alta del sprint 1: leads que escriben al footer pueden no estar siendo atendidos.

---

## 0.2 Subtítulo del logo en footer

**Ubicación esperada en código:** componente `Footer`, debajo del logo.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> IA que escucha, entiende y actúa por tu negocio.

### Copy nuevo

```
El sistema operativo de las empresas que no quieren ser Enterprise.
```

### Notas de implementación

- Es la frase ancla del nuevo posicionamiento. Aparece en el footer de todas las páginas.
- Si el footer está en un componente compartido, este cambio se propaga solo.

---

## 0.3 Coherencia del menú principal

**Ubicación esperada en código:** componente `Header` / `Navigation`.
**Tipo de cambio:** REESTRUCTURAR

### Estado actual

Inconsistencias entre páginas: algunas muestran "Blog" en el menú, otras no. El footer de `/use-cases` enlaza a `/automations` que no existe en el menú principal.

### Estructura nueva (estandarizar)

```
Menú principal:
- Soluciones      → /es/solutions
- Casos de Uso    → /es/use-cases
- Sobre Nosotros  → /es/about
- [Empezar]       → /es/start  (CTA principal, estilo botón)
```

**No incluir Blog en el menú principal hasta que haya 3-4 artículos publicados.** Ver `06-blog.md`.

### Notas de implementación

- Eliminar el enlace `Blog` del menú principal.
- En el footer, ver sección 0.4.

---

## 0.4 Footer estandarizado

**Ubicación esperada en código:** componente `Footer`.
**Tipo de cambio:** REESTRUCTURAR

### Estructura nueva

```
[Logo Prozeso]
El sistema operativo de las empresas que no quieren ser Enterprise.

PRODUCTO
- Soluciones      → /es/solutions
- Casos de Uso    → /es/use-cases
- Empezar         → /es/start

EMPRESA
- Sobre Nosotros  → /es/about
- Aviso Legal     → /es/legal/notice
- Términos y Condiciones → /es/legal/terms
- Política de Privacidad → /es/legal/privacy
- Política de Cookies    → /es/legal/cookies
- Contacto        → mailto:admin@prozeso.com

SOCIAL
- Instagram       → https://instagram.com/prozeso.ai
- LinkedIn        → https://www.linkedin.com/company/prozeso

© 2026 Prozeso. Todos los derechos reservados.
```

### Notas de implementación

- Eliminar `/automations` del footer de cualquier página (ruta que no existe).
- No incluir Blog hasta que se reactive (ver `06-blog.md`).
- Mantener idéntico en todas las páginas — un único componente, no copy/paste.

---

## 0.5 Botón "Hablar con un agente" / chat widget

**Ubicación esperada en código:** elemento flotante en esquina inferior, presente en todas las páginas.
**Tipo de cambio:** EVALUAR

### Estado actual

Aparece "Hablar con un agente" como widget flotante en todas las páginas.

### Decisión pendiente

Si el widget conecta con un agente humano de Prozeso o un bot: mantener.

Si conecta con un asistente IA genérico: **evaluar si quitarlo**. La nueva narrativa es "no vendemos IA en el headline" — un widget que abre un chat con IA en cada página contradice esa narrativa.

### Notas de implementación

- Necesito confirmación de Alejandro o Cristian sobre qué hace el botón hoy antes de hacer cambios.
- Si se mantiene, asegurarse de que el etiquetado no es "Habla con nuestra IA" sino "Habla con nosotros".
