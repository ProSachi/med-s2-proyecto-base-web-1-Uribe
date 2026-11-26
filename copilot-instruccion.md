# Instrucciones operativas Web 1 · Armario Digital (7 módulos)

Base técnica obligatoria: **HTML5 + CSS3 + JavaScript vainilla**, sin frameworks UI ni módulos ES.  
Referencia principal de módulos/CRUD: `https://armario-digital-grupo-uribe.vercel.app/#modulos`.

## Mapeo extraído de `#modulos` (fuente de verdad funcional)

| Célula | Lote | Módulo | CRUD esperado |
|---|---|---|---|
| 1 | LOTE 01 | Catálogo de Prendas y Marcas | Crear/leer/actualizar/eliminar marcas y prendas (eliminación lógica). |
| 2 | LOTE 02 | Creador de Outfits | Crear/leer/actualizar/eliminar outfits. |
| 3 | LOTE 03 | Armario y Matching | Agregar/listar/eliminar prendas de armario y matching de looks. |
| 4 | LOTE 04 | Asesoría de Imagen y Clima | CRUD de perfil de estilo, reglas y consulta de clima. |
| 5 | LOTE 05 | Planificador y Wishlist | CRUD de planes, maletas y lista de deseos. |
| 6 | LOTE 06 | Comunidad y Lookbook Social | CRUD de tableros/comentarios/feed social. |
| 7 | LOTE 07 | Mercadeo y Fidelización | CRUD de campañas, cupones y puntos. |

> Nota: la referencia también define **LOTE 00 (Usuarios y Autenticación)** como transversal. Se mantiene como soporte de datos/servicios, sin romper el esquema de 7 células.

## Identidad visual y tokens

- Tema global: `assets/css/armario-digital.css`.
- Paleta observada en referencia: `#FAFAFA`, `#FFFFFF`, `#1C1C1E`, `#6E6E73`, `#CBAA71`, `#E5E5EA`.
- Tipografía: enfoque estilo **Outfit** con jerarquía clara.
- Componentes: tarjetas limpias, grillas responsivas, botones píldora, borde suave y sombra ligera.

## Fronteras de capas (obligatorias)

**Vista -> `<Entidad>Validacion` / `<Entidad>Servicio` -> `api.config.js` -> `data/` o `fetch`**

- Vistas (`index.html`, `celula-N-*/index.html`, `celula-N-*/js/*.js`):
  - Capturan eventos CRUD y renderizan UI.
  - Prohibido consumir `data/*.js` directo o ejecutar `fetch`.
- Servicios (`services/`):
  - Centralizan modo `"local"`/`"api"` y CRUD con `async/await` + `try/catch`.
- Datos (`data/`):
  - Semillas con IDs numéricos consecutivos desde `1`.

## Autenticación y acceso por módulo

- Inicio del proyecto: **Catálogo (Célula 1)**.
- El catálogo es de acceso público.
- Células 2 a 7 requieren sesión activa.
- Navegación y guardas de acceso centralizadas en `assets/js/layout.js`.
- La sesión de demo de frontend se persiste en `localStorage` (`armario_sesion`).

## Reglas de codificación (español y normalización)

- HTML obligatorio:
  - `<meta charset="utf-8">`
  - `<html lang="es">`
- Para búsquedas/filtros/comparaciones:
  - `NFC` para persistencia/visualización.
  - `NFD` + remoción de diacríticos para matching insensible:
  - `texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`.

## HTML semántico, CSS y JS

- HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, formularios con `<label for>`.
- CSS:
  - Variables globales en `assets/css/armario-digital.css`.
  - Encapsular por célula en `celula-N-*/css/celula-N.css`.
  - Sin `!important` salvo justificación técnica.
- JS:
  - Sin `import`/`export`.
  - Orden de scripts: `data` -> `api.config.js` -> `services` -> `assets/js` -> `celula-N/js`.
  - Validaciones y servicios en objetos públicos `<Entidad>Validacion` / `<Entidad>Servicio`.

## GitFlow y Pull Request

- Ramas: `main`, `develop`, `feat/celula-N-...`, `fix/...`.
- Commits claros, atómicos y descriptivos.
- Checklist PR:
  - [ ] Respeta separación Vista/Servicio/Config/Datos.
  - [ ] CRUD funcional en modo local y API.
  - [ ] Reglas de acceso: catálogo público, módulos protegidos autenticados.
  - [ ] UTF-8, `lang="es"`, tildes/ñ y normalización correctas.
  - [ ] Sin errores en consola/red.
  - [ ] Sin secretos ni archivos temporales.

