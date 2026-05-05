# 02 — Soluciones (prozeso.com/es/solutions)

**URL:** https://www.prozeso.com/es/solutions
**Prioridad:** CRÍTICA — es la página con mayor volumen de promesas inflables

---

## 2.1 Hero

**Ubicación esperada en código:** título principal de la página y subtítulo.
**Tipo de cambio:** SUSTITUIR

### Copy actual

> # Nuestras Soluciones
>
> Flujos de trabajo impulsados por IA, diseñados para negocios de servicios. Combínalos para crear tu stack de automatización perfecto.

### Copy nuevo

```
# El catálogo modular.

13 áreas funcionales. Cientos de automatizaciones documentadas. Empezamos por la pieza donde más sangra tu empresa, ampliamos cuando lo demuestra.
```

### Notas de implementación

- "Cientos de automatizaciones documentadas" es honesto: tenemos ~1,550 según el inventario. No comprometemos a entregar 1,550 — solo decimos que el catálogo está documentado.

---

## 2.2 Reorganización estructural de la página (CRÍTICO)

**Tipo de cambio:** REESTRUCTURAR

### Estructura actual

La página agrupa las 36 automatizaciones en 4 macroáreas: Atención al cliente · Crecimiento · Operaciones / Logística · Corporativo / Soporte.

### Estructura nueva

Reorganizar las automatizaciones en los **13 módulos del memo**, agrupados visualmente en las 4 macroáreas:

```
[Macroárea 1] Atención al cliente
- Customer Service
- Bookings
- Customer Success

[Macroárea 2] Crecimiento
- Sales
- Marketing
- Product

[Macroárea 3] Operaciones
- Operations
- Inventory
- IT

[Macroárea 4] Soporte corporativo
- Finance
- HR
- Legal
- Management
```

Cada módulo lleva un título, una descripción corta de 1-2 líneas, y la lista de fichas que pertenecen a ese módulo.

---

## 2.3 Patrón nuevo para cada ficha de automatización

**Cada una de las 36 fichas (las que ya están + las que se reorganizan) sigue el mismo patrón:**

```
## [Nombre de la automatización]

**Área:** [módulo del memo]
**Estado:** [PLACEHOLDER_ESTADO_X]

[Descripción corta: 1-2 frases describiendo qué resuelve y para quién.]

[Si Estado = "en producción":]
Casos en producción: [PLACEHOLDER_CLIENTE_X], [PLACEHOLDER_CLIENTE_Y]

[Si Estado = "roadmap":]
Disponible: [PLACEHOLDER_FECHA_X]

[Si Estado = "visión":]
Disponible bajo proyecto custom para clientes con módulo [X] contratado.
```

### Reglas

1. **Ninguna ficha lleva una métrica concreta al lado del nombre.** Las métricas viven en los casos atribuidos a clientes reales (en sección de casos), no en el catálogo.
2. **Cada ficha lleva un Estado**, que tiene que estar clasificado antes de publicar:
   - `en producción` — al menos 1 cliente activo usándola en producción
   - `roadmap` — desarrollo en curso, deploy en cliente posible en 60-90 días
   - `visión` — documentada, no productizada, disponible solo bajo proyecto custom
3. **Los nombres de las automatizaciones se mantienen** — el cambio es de estructura y descripción, no de catálogo.

### Bloqueo conocido

**Las 36 fichas necesitan ser clasificadas por Estado antes de publicar.** Esto es trabajo de Alejandro + Cristian con datos reales (qué cliente paga, qué cliente usa, qué está realmente desplegado). El copy de cada ficha está abajo con `[PLACEHOLDER_ESTADO_X]` para rellenar.

---

## 2.4 Las 36 fichas — copy nuevo

A continuación las 36 fichas con el copy reescrito y el placeholder de estado. Mantengo la numeración original de la web actual para facilitar el mapeo.

---

### Customer Service

```
## 01. Recepcionista IA

**Área:** Customer Service
**Estado:** [PLACEHOLDER_ESTADO_01]

Atiende llamadas y mensajes 24/7. Cualifica al cliente, agenda, confirma y deriva al equipo cuando hace falta. Funciona en voz y WhatsApp. Casos en producción: [PLACEHOLDER_CLIENTE_REC_1], [PLACEHOLDER_CLIENTE_REC_2].
```

```
## 02. Recordatorios de citas

**Área:** Customer Service
**Estado:** [PLACEHOLDER_ESTADO_02]

Recordatorios automáticos a través del canal preferido del cliente (SMS, email, WhatsApp). Confirmación, reprogramación o cancelación con un click. Casos en producción: [PLACEHOLDER_CLIENTE_RECORD_1].
```

```
## 03. Impulsor de reseñas

**Área:** Customer Service
**Estado:** [PLACEHOLDER_ESTADO_03]

Identifica el momento óptimo de cada cliente y le pide una reseña por el canal donde es más probable que responda. Reduce fricción y multiplica reseñas positivas en Google y similares.
```

```
## 04. Reprogramación inteligente

**Área:** Customer Service
**Estado:** [PLACEHOLDER_ESTADO_04]

Cuando un cliente cancela, el sistema rellena el hueco proactivamente: ofrece la cita a clientes en lista de espera o a quien tenga una cita lejana que pueda adelantar. Recupera huecos sin gestión manual.
```

---

### Customer Success

```
## 25. Flujo de onboarding de cliente

**Área:** Customer Success
**Estado:** [PLACEHOLDER_ESTADO_25]

Guía al cliente nuevo paso a paso desde la firma hasta que está activo y produciendo valor. Reduce el time-to-value y elimina el "vacío post-venta" que mata la activación.
```

```
## 26. Predicción y rescate de bajas

**Área:** Customer Success
**Estado:** [PLACEHOLDER_ESTADO_26]

Detecta señales de churn antes de que el cliente se vaya y dispara acciones de rescate (intervención CSM, oferta personalizada, reactivación). Anticipa la baja en lugar de reaccionar.
```

```
## 27. Upsell & cross-sell automático

**Área:** Customer Success
**Estado:** [PLACEHOLDER_ESTADO_27]

Identifica el momento adecuado para ofrecer un módulo o servicio adicional al cliente, y se lo presenta por el canal donde es más receptivo. Convierte expansión en proceso, no en suerte.
```

```
## 28. NPS y ciclo de feedback

**Área:** Customer Success
**Estado:** [PLACEHOLDER_ESTADO_28]

Encuesta NPS automatizada en los momentos clave del ciclo de cliente, con clasificación de respuestas y disparador de acciones (rescate, upsell, caso de éxito).
```

---

### Sales

```
## 09. Prospección IA

**Área:** Sales
**Estado:** [PLACEHOLDER_ESTADO_09]

Identifica empresas que coinciden con tu ICP, encuentra al decisor correcto y lanza el primer contacto por el canal adecuado. Multiplica el volumen de prospección sin escalar el equipo comercial.
```

```
## 10. Puntuación de leads

**Área:** Sales
**Estado:** [PLACEHOLDER_ESTADO_10]

Puntúa cada lead entrante según probabilidad real de cierre, basándose en señales de comportamiento, perfil y contexto. Tu equipo comercial trabaja primero los leads que más convierten.
```

```
## 11. Bot de seguimiento

**Área:** Sales
**Estado:** [PLACEHOLDER_ESTADO_11]

Automatiza el follow-up con leads inactivos hasta que responden o piden parar. Recupera oportunidades que se enfriaron por falta de tiempo del comercial, no por falta de interés.
```

```
## 12. Propuesta automática

**Área:** Sales
**Estado:** [PLACEHOLDER_ESTADO_12]

Genera propuestas comerciales personalizadas a partir de los datos del prospect y el catálogo de servicios. El comercial revisa y envía. Reduce drásticamente el tiempo de elaboración.
```

---

### Marketing

```
## 21. Fábrica de contenido IA

**Área:** Marketing
**Estado:** [PLACEHOLDER_ESTADO_21]

Genera, programa y publica contenido en los canales relevantes a partir de un brief o un calendario editorial. Multiplica volumen sin perder consistencia de marca.
```

```
## 22. Email marketing automático

**Área:** Marketing
**Estado:** [PLACEHOLDER_ESTADO_22]

Secuencias de email triggered por comportamiento del usuario (visita, compra, abandono, etc.). Segmentación, personalización y A/B testing automatizados.
```

```
## 23. Escucha social y respuesta

**Área:** Marketing
**Estado:** [PLACEHOLDER_ESTADO_23]

Monitoriza menciones de tu marca y conversaciones relevantes en redes sociales, y responde o escala según reglas. Gestiona comunidad sin tener un community manager dedicado.
```

```
## 24. Medidor de ROI de campañas

**Área:** Marketing
**Estado:** [PLACEHOLDER_ESTADO_24]

Atribuye conversiones a las campañas que las generaron en cada canal y cada paso del funnel. Optimiza presupuesto sobre datos reales, no sobre intuición.
```

---

### Operations

```
## 33. Gestión de proveedores

**Área:** Operations
**Estado:** [PLACEHOLDER_ESTADO_33]

Centraliza el ciclo completo con proveedores: solicitud, comparativa, aprobación, orden de compra, recepción. Reduce el ciclo de compra y mejora la trazabilidad.
```

```
## 34. Seguimiento de entregas

**Área:** Operations
**Estado:** [PLACEHOLDER_ESTADO_34]

Notificaciones proactivas al cliente sobre el estado de su pedido (preparación, en ruta, entregado, incidencia) sin que tenga que preguntar. Reduce reclamaciones y carga de soporte.
```

```
## 35. Mantenimiento preventivo

**Área:** Operations
**Estado:** [PLACEHOLDER_ESTADO_35]

Programa intervenciones de mantenimiento sobre activos críticos antes de que fallen, basándose en uso, sensores o calendario. Reduce averías imprevistas y paradas no planificadas.
```

```
## 36. SLA y escalado automático

**Área:** Operations
**Estado:** [PLACEHOLDER_ESTADO_36]

Monitoriza el cumplimiento de SLAs en tiempo real y escala automáticamente las incidencias que están en riesgo de incumplimiento. Garantiza calidad de servicio sin gestión manual.
```

---

### Inventory

```
## 17. Reposición automática

**Área:** Inventory
**Estado:** [PLACEHOLDER_ESTADO_17]

Calcula el momento óptimo de reposición de cada referencia basándose en consumo, lead time y stock de seguridad. Genera la orden de compra automáticamente cuando se cruza el umbral.
```

```
## 18. Alertas de stock y anomalías

**Área:** Inventory
**Estado:** [PLACEHOLDER_ESTADO_18]

Detecta variaciones inusuales de stock (consumo anómalo, mermas, errores de conteo) y alerta al responsable antes de que se conviertan en rotura o exceso.
```

```
## 19. Liquidación de stock muerto

**Área:** Inventory
**Estado:** [PLACEHOLDER_ESTADO_19]

Identifica referencias con baja rotación y dispara acciones de liquidación: descuentos automáticos, ofertas a clientes específicos, transferencia entre almacenes.
```

```
## 20. Previsión de demanda

**Área:** Inventory
**Estado:** [PLACEHOLDER_ESTADO_20]

Predice la demanda futura por referencia, canal y periodo, integrando estacionalidad, tendencias y eventos. Permite ajustar compras y reducir capital inmovilizado.
```

---

### Finance

```
## 13. Facturación automática

**Área:** Finance
**Estado:** [PLACEHOLDER_ESTADO_13]

Generación, envío y seguimiento de facturas integrado con tu ERP, tu CRM y tu banca. Acorta el ciclo medio de cobro al eliminar los pasos manuales entre prestación y factura.
```

```
## 14. Cobros y recordatorios

**Área:** Finance
**Estado:** [PLACEHOLDER_ESTADO_14]

Secuencia de recordatorios de pago automáticos por email, SMS o WhatsApp, escalando intensidad según días de retraso y perfil del cliente. Mejora cash flow sin tensar la relación.
```

```
## 15. Conciliación bancaria

**Área:** Finance
**Estado:** [PLACEHOLDER_ESTADO_15]

Cruza automáticamente los movimientos bancarios con facturas emitidas y recibidas. Lo que coincide se concilia solo; las excepciones quedan listas para que las revise el equipo financiero.
```

```
## 16. Alertas de presupuesto

**Área:** Finance
**Estado:** [PLACEHOLDER_ESTADO_16]

Monitoriza desviaciones presupuestarias por línea, departamento o proyecto, y alerta cuando se aproxima un umbral. Permite reaccionar antes del cierre del periodo.
```

---

### HR

```
## 05. Fichaje geolocalizado

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_05]

Registro horario con verificación de ubicación, integrado con la nómina y el cumplimiento normativo. Elimina fraude de presencia y simplifica el cierre de horas mensual.
```

```
## 06. Asignador de tareas

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_06]

Distribuye tareas entre el equipo según carga, capacidad y prioridad, y reasigna automáticamente cuando hay cambios. Reduce el tiempo de coordinación operativa diaria.
```

```
## 07. Informe automático

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_07]

Genera y distribuye los informes de gestión recurrentes (semanales, mensuales) sin intervención manual. Cada responsable recibe lo que necesita, en su formato, en su canal.
```

```
## 08. Flujo de onboarding (empleados)

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_08]

Automatiza la incorporación de nuevos empleados: documentación, accesos, formación inicial, plan de los primeros 90 días. Reduce el tiempo administrativo y mejora la experiencia del empleado.
```

```
## 29. Criba curricular asistida

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_29]

Clasifica candidatos según criterios definidos por el cliente (experiencia, formación, fit cultural). Acelera la primera fase del proceso de selección sin sustituir el criterio humano final.
```

```
## 30. Candidate nurturing

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_30]

Mantiene a los candidatos en proceso comprometidos entre etapas con comunicaciones automáticas relevantes. Reduce abandono y mejora la experiencia del candidato.
```

```
## 31. Pre-screening de entrevistas

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_31]

Entrevista inicial automatizada por chat o voz con preguntas cualificadoras. El equipo de selección recibe un resumen estructurado de cada candidato antes de invertir tiempo en entrevista presencial.
```

```
## 32. Offboarding automatizado

**Área:** HR
**Estado:** [PLACEHOLDER_ESTADO_32]

Gestiona el ciclo completo de salida: revocación de accesos, devolución de activos, finiquito, encuesta de salida. Asegura compliance sin que se escape ningún paso.
```

---

## 2.5 Notas de implementación globales para /solutions

```
1. La numeración (01 a 36) puede mantenerse o eliminarse — es preferencia visual.
   Si se mantiene, los huecos numéricos (faltan algunos números) son intencionales:
   son los que ocupaban automatizaciones que no incluimos.

2. La tabla de placeholders de estado (PLACEHOLDER_ESTADO_01 a PLACEHOLDER_ESTADO_36)
   está al final, en PLACEHOLDERS.md, lista para que Alejandro y Cristian la rellenen
   antes de publicar.

3. Hasta que la clasificación esté completa, esta página NO se publica con el copy nuevo.
   El daño de mostrar 36 placeholders visibles es mayor que el de la web actual con
   métricas inventadas durante unos días más.

4. El componente visual de cada ficha tiene que cambiar:
   - Se elimina la métrica destacada al lado del nombre (ej. "↑ 40% en reservas").
   - Se añade la línea "Área: X · Estado: Y".
   - Si Estado = "en producción", se añade la línea de "Casos en producción: ...".
```
