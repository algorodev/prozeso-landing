# 04 — Casos de Uso (prozeso.com/es/use-cases)

**URL:** https://www.prozeso.com/es/use-cases
**Prioridad:** CRÍTICA — incluye el formulario de "reporte IA" que hay que eliminar

---

## 4.1 Hero — Eliminar el formulario de "reporte IA"

**Ubicación esperada en código:** primera sección de la página, con el título y el formulario de generación de reporte personalizado.
**Tipo de cambio:** ELIMINAR + REESTRUCTURAR

### Copy actual

> # Descubre cómo la automatización puede transformar tu negocio
>
> Cuéntanos sobre tu situación actual y nuestra AI identificará los pain points específicos de tu empresa y te mostrará casos de uso personalizados.
>
> ## Genera tu Reporte Personalizado
>
> Completa el formulario a continuación y nuestra IA analizará tus puntos críticos y generará un reporte personalizado sobre cómo podemos ayudar a tu negocio.
>
> [Formulario con: Tamaño de empresa, Industria, Puntos críticos, Generar Reporte]

### Copy nuevo

```
# Casos reales. Empresas que se parecen a la tuya.

En lugar de un formulario que te genera un PDF, te enseñamos cómo trabajan ya empresas como la tuya. Si quieres profundizar, hablamos.

[CTA principal: Hablar con nosotros] → /es/start
[CTA secundario: Ver el catálogo modular] → /es/solutions
```

### Notas de implementación

- **ELIMINAR** completamente el formulario "Genera tu Reporte Personalizado".
- **ELIMINAR** la promesa de "nuestra IA analizará tus puntos críticos".
- Razón: un PDF auto-generado por LLM con "tus pain points" es marketing genérico que el prospect descubre como hueco en 10 segundos. Es exactamente la trampa que el memo advierte (vender IA donde no aporta valor real).
- Si la lógica del formulario está integrada con CRM o automatización backend, también desconectar esa integración.

---

## 4.2 Sección "Casos de Uso por Área de Negocio" — REESTRUCTURAR completa

**Ubicación esperada en código:** la sección con tabs de áreas (Operaciones, Ventas, RRHH, Finanzas, Atención al Cliente) y bloques de casos genéricos con métricas.
**Tipo de cambio:** ELIMINAR + REEMPLAZAR con casos reales

### Copy actual (a eliminar)

Bloques genéricos como:
> ### Automatización de Workflows
> Conecta automáticamente tus herramientas para eliminar tareas repetitivas y optimizar procesos
> 85% reducción en tareas manuales · 40 hrs/semana ahorradas por equipo

> ### Gestión de Inventario
> Seguimiento de stock en tiempo real y pedidos automáticos...
> 60% reducción en desabastecimientos · 35% disminución en costos de almacenamiento

(y los demás bloques con métricas inventadas)

### Copy nuevo — Estructura

```
## Cómo trabajan ya empresas como la tuya.

Tres casos reales con permiso explícito de los clientes. Si te reconoces en alguno, hablemos.

[Filtro / tabs: Servicios · Distribución / Industrial · Hostelería]
```

Y dentro, **3 casos** siguiendo este patrón cada uno:

```
### [PLACEHOLDER_CLIENTE_CASO_X]

**Sector:** [PLACEHOLDER_SECTOR_CASO_X]
**Tamaño:** [PLACEHOLDER_TAMANO_CASO_X]
**Módulo de entrada:** [PLACEHOLDER_MODULO_CASO_X]

#### Antes
[PLACEHOLDER_ANTES_CASO_X]
*Una descripción concreta del dolor antes de Prozeso. Ejemplo: "El equipo de recepción no podía atender las llamadas fuera de horario, perdiendo X reservas a la semana sin saberlo."*

#### Solución
[PLACEHOLDER_SOLUCION_CASO_X]
*Qué módulo entró, en cuánto tiempo, con qué alcance. Ejemplo: "Implementamos el módulo de Recepcionista IA en 3 semanas. Atiende llamadas y mensajes en castellano y catalán, agenda directamente en su sistema de gestión."*

#### Resultado
[PLACEHOLDER_RESULTADO_CASO_X]
*Una métrica honesta atribuida al caso. Ejemplo: "En el primer mes se capturaron 47 reservas fuera de horario que antes se perdían. La métrica está validada con los registros internos del cliente."*

#### Quote del cliente
> "[PLACEHOLDER_QUOTE_CASO_X]"
> — [PLACEHOLDER_NOMBRE_CARGO_CASO_X]

#### Estado actual
[PLACEHOLDER_ESTADO_ACTUAL_CASO_X]
*Si siguen ampliando módulos, qué módulo están considerando próximo. Ejemplo: "Actualmente evaluando ampliación al módulo de Marketing para automatizar comunicación con clientes históricos."*
```

### Casos sugeridos (3 mínimo)

```
Caso 1 — ICP Servicios
Cliente sugerido: una clínica veterinaria, salón de belleza, escuela de danza, etc.
Módulo de entrada: Customer Service (recepcionista IA + recordatorios)

Caso 2 — ICP Distribución / Industrial
Cliente sugerido: una distribuidora B2B, fabricante con clientes recurrentes, etc.
Módulo de entrada: Operations (captura de pedidos por WhatsApp, validación, integración con ERP)

Caso 3 — ICP Hostelería / Restauración
Cliente sugerido: cadena de restaurantes, eventos, catering, etc.
Módulo de entrada: Bookings (reservas 24/7 + recordatorios)
```

### Notas de implementación

- **Bloqueo conocido:** esta sección no se publica hasta tener 3 casos firmados con permiso explícito del cliente y datos verificables.
- Mientras llegan los casos, esta sección puede quedarse como "Casos en construcción" con un CTA claro a `/es/start` o eliminarse temporalmente.
- Cubrir tres ICPs distintos demuestra que Prozeso no es solo para un sector. Es un mensaje implícito clave del nuevo posicionamiento.

---

## 4.3 CTA final

**Ubicación esperada en código:** sección al final de la página antes del footer.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> ## ¿Listo para automatizar?
> Empieza tu evaluación gratuita hoy. Descubre exactamente qué automatizaciones transformarán tu negocio.
>
> [Comenzar evaluación gratis] [Reservar una llamada]

### Copy nuevo

```
## ¿Te reconoces en alguno de estos casos?

Si tu empresa se parece a alguno de los anteriores, una conversación de 30 minutos es suficiente para saber cómo encajaría Prozeso. Si no, te lo decimos.

[Hablar con nosotros] → /es/start
[Ver el catálogo modular] → /es/solutions
```

### Notas de implementación

- Vincula el CTA con los casos vistos arriba ("¿Te reconoces en alguno?"), no con una promesa abstracta.
- Mismos CTAs que en home y `/start` para coherencia.

---

## 4.4 Limpieza del footer de esta página

**Ubicación esperada en código:** footer específico de `/use-cases`.
**Tipo de cambio:** ELIMINAR enlace roto

### Acción

```
ELIMINAR el enlace a /es/automations del footer.
La ruta no existe en el menú principal y produce inconsistencia.
```

Ver `00-global-changes.md` sección 0.4 para la estructura estandarizada del footer.
