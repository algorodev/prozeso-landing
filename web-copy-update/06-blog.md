# 06 — Blog (prozeso.com/es/blog)

**URL:** https://www.prozeso.com/es/blog
**Prioridad:** BAJA — pero hay que actuar

---

## 6.1 Decisión: ocultar el blog del menú principal

**Ubicación esperada en código:** componente `Header` / `Navigation` y el footer.
**Tipo de cambio:** ELIMINAR (temporalmente)

### Acción

```
ELIMINAR el enlace "Blog" del menú principal.
ELIMINAR el enlace "Blog" del footer.
MANTENER la ruta /es/blog accesible directamente (no devolver 404).
```

### Razón

Una página de blog con un placeholder "Próximamente" transmite que la empresa aún no produce contenido — peor que no tener blog en absoluto.

Reactivamos cuando haya 3-4 artículos publicados.

---

## 6.2 La página /es/blog en sí

**Ubicación esperada en código:** la página actual con el bloque "Estamos preparando algo bueno".
**Tipo de cambio:** MANTENER (la ruta sigue accesible) o SIMPLIFICAR

### Opción A — Mantener tal como está

La ruta sigue accesible directamente pero ya no se enlaza desde menú o footer. Quien tenga el link directo (improbable) ve el placeholder actual.

### Opción B — Simplificar el placeholder

Si quieres dejar la página un poco más alineada al nuevo posicionamiento mientras se reactiva, copy nuevo:

```
# Blog

Estamos preparando los primeros artículos. Mientras tanto, si quieres profundizar en algo concreto, escríbenos: admin@prozeso.com.
```

### Notas de implementación

- **Recomiendo Opción A.** Cuanto menos toquemos esta página ahora, mejor — el esfuerzo está mejor invertido en producir contenido real.
- Cuando se reactive, ver sección 6.3.

---

## 6.3 Plan de reactivación (referencia para el futuro)

**No es un cambio de código actual.** Es contexto para cuando haya contenido.

### Tres ideas iniciales de artículos alineados con el posicionamiento

```
1. "Por qué tu pyme no necesita un ERP, necesita la capa que lo conecta con WhatsApp"
   - Tono: provocador
   - Ataca directamente el posicionamiento de Holded/Odoo/Zoho
   - SEO: "alternativa a Holded", "automatización WhatsApp pymes"

2. "Cómo [PLACEHOLDER_CLIENTE_BLOG_1] redujo un X% los no-shows sin cambiar de software de gestión"
   - Tono: caso real, formato narrativo
   - ICP servicios
   - SEO: "reducir no-shows clínica/peluquería/etc."

3. "El hueco entre Excel y SAP: cuánto cuesta no llenarlo"
   - Tono: pieza de pensamiento
   - ICP industrial / distribución
   - SEO: "ERP pymes industria", "alternativa SAP empresa mediana"
```

### Cuando se reactive

```
Pasos:
1. Producir y publicar los 3 artículos.
2. Reactivar el enlace "Blog" en menú principal y footer.
3. Reescribir la página índice /es/blog con la lista de artículos
   (no el placeholder actual).
```

### Notas de implementación

- No es trabajo para Claude Code ahora. Solo guardar este archivo como referencia para cuando llegue el momento.
