# Plan de trabajo Web 1 · guía para estudiantes por equipo

Este plan está orientado a que cada estudiante sepa **qué hacer, en qué orden y cómo validar** su aporte dentro del equipo.

## Ruta de trabajo del estudiante (paso a paso)

1. Levantar el proyecto con Live Server (no `file://`).
2. Revisar tu célula asignada y su entidad en `data/` + `services/modulos.servicio.js`.
3. Implementar o ajustar primero **Validación**, después **Servicio**, y recién ahí la **Vista**.
4. Probar CRUD completo de tu célula.
5. Verificar navegación y autenticación: catálogo público, resto privado.

## Arranque técnico del equipo

1. Inicio real: `index.html` redirige a `celula-1-catalogo-prendas-marcas/index.html`.
2. Barra de navegación compartida: `assets/js/layout.js`.
3. Tema global y utilidades: `assets/css/armario-digital.css`, `assets/js/utilidades.js`.
4. Datos semilla: `data/*.js`.
5. Servicios/validaciones: `services/api.config.js`, `services/modulos.servicio.js`.

## Alcance CRUD por célula (7 módulos)

| Célula | Carpeta | Entidad principal | Operaciones CRUD objetivo | Criterio de aceptación |
|---|---|---|---|---|
| 1 | `celula-1-catalogo-prendas-marcas/` | `catalogoPrendasMarcas` | Crear/listar/actualizar/eliminar lógico prendas-marcas | Formulario CRUD funcional y listado actualizado en pantalla. |
| 2 | `celula-2-creador-outfits/` | `creadorOutfits` | Crear/listar/actualizar/eliminar outfit | Persistencia local por servicio y feedback visual de operación. |
| 3 | `celula-3-armario-matching/` | `armarioMatching` | Crear/listar/eliminar prenda + consultar matching | Flujos sin acceso directo a `data/`. |
| 4 | `celula-4-asesoria-imagen-clima/` | `asesoriaImagenClima` | Crear/listar/actualizar/eliminar perfil-regla | Validaciones de campos obligatorios activas. |
| 5 | `celula-5-planificador-wishlist/` | `planificadorWishlist` | Crear/listar/actualizar/eliminar plan/maleta/wishlist | Estados de registros cambiando correctamente. |
| 6 | `celula-6-comunidad-lookbook-social/` | `comunidadLookbookSocial` | Crear/listar/eliminar tableros/comentarios/favoritos | Render de feed social y borrado controlado. |
| 7 | `celula-7-mercadeo-fidelizacion/` | `mercadeoFidelizacion` | Crear/listar/actualizar/eliminar campañas/cupones | CRUD admin operativo con mensajes de éxito/error. |

## Modo de uso del service (obligatorio para estudiantes)

| Modo | Dónde se configura | Cuándo usarlo | Regla |
|---|---|---|---|
| `local` | `ApiConfig.setMode("local")` | Desarrollo diario en clase | Consume semillas `data/*.js` desde servicio. |
| `api` | `ApiConfig.setMode("api")` | Integración con backend | La vista no cambia; sólo cambia el origen en servicio. |

Flujo correcto en cada tarea:

1. `Validacion.validarRegistro(...)`
2. `Servicio.crear/listar/obtenerPorId/actualizar/eliminar(...)`
3. Render de UI

## Dependencias críticas

1. `ApiConfig.mode` estable antes de pruebas de integración.
2. `<Entidad>Validacion` listo antes de conectar formularios de vista.
3. `<Entidad>Servicio` con CRUD completo antes de pruebas de células.
4. `layout.js` actualizado con rutas finales antes de smoke test general.

## Hitos de integración

- **H1:** Navegación desde catálogo hacia 7 células sin rutas rotas.
- **H2:** Todas las células consumen exclusivamente servicios.
- **H3:** Conmutación `"local"` / `"api"` sin tocar JS de vistas.
- **H4:** Autenticación en cliente: catálogo público y módulos 2-7 protegidos.
- **H5:** Cero errores en consola/red y normalización de texto validada.

## Roles sugeridos

| Rol | Responsabilidad |
|---|---|
| Tech Lead | Definir contratos de servicio/validación y checklist de integración. |
| Front célula | Construir UI semántica y eventos CRUD por módulo. |
| Integrador | Verificar orden de scripts, rutas, estilo global y smoke tests. |
| QA estudiante | Ejecutar checklist CRUD + auth + modo local/api antes de PR. |

