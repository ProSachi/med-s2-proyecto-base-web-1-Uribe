# Armario Digital Web 1 · Guía de implementación para estudiantes

Proyecto académico multi-célula en **HTML, CSS y JavaScript vainilla** con arquitectura por capas y CRUD por módulo.

## Inicio rápido

1. Abrí la carpeta con VS Code.
2. Ejecutá **Live Server** sobre `index.html`.
3. Vas a entrar al catálogo (`celula-1-catalogo-prendas-marcas/`), que es público.

## Arquitectura del proyecto

- `assets/css/armario-digital.css`: tema global y utilidades visuales.
- `assets/js/utilidades.js`: normalización, escape, helpers.
- `assets/js/layout.js`: navegación compartida + autenticación de frontend.
- `data/*.js`: semillas por módulo, IDs consecutivos desde `1`.
- `services/api.config.js`: modo de servicio (`local` / `api`).
- `services/modulos.servicio.js`: validación + servicios CRUD.
- `celula-N-*/`: vistas y controladores por célula.

## Reglas de acceso

- **Público:** Célula 1 (Catálogo).
- **Autenticado:** Células 2 a 7.
- Botón de sesión:
  - **Iniciar sesión**: habilita módulos protegidos.
  - **Cerrar sesión**: vuelve a catálogo público.

## Modos de uso del service

### 1) Modo local (default recomendado para clase)

```js
ApiConfig.setMode("local");
```

Lee y escribe contra `data/*.js` (en memoria del navegador).

### 2) Modo api (integración backend)

```js
ApiConfig.setMode("api");
```

Consume endpoints definidos en `services/api.config.js` vía `fetch`.

## Flujo correcto de implementación en cada célula

1. Definir/ajustar `XValidacion`.
2. Usar `XServicio` (`crear`, `listar`, `obtenerPorId`, `actualizar`, `eliminar`).
3. Renderizar UI desde vista.
4. Probar CRUD completo.
5. Verificar que no haya acceso directo desde vista a `data/` o `fetch`.

## Checklist antes de entregar tu tarea

- [ ] HTML con `<meta charset="utf-8">` y `<html lang="es">`.
- [ ] Normalización de texto (`NFC`/`NFD`) en búsquedas/filtros.
- [ ] CRUD funcional de tu módulo.
- [ ] Modo `local` y `api` probado sin cambiar la vista.
- [ ] Catálogo público y módulos 2-7 protegidos.
- [ ] Cero errores en consola y red.

