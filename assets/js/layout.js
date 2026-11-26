window.AppLayout = (function () {
  var STORAGE_SESION = "armario_sesion";
  var modulos = [
    { id: 1, nombre: "Catálogo", ruta: "celula-1-catalogo-prendas-marcas/index.html", requiereAuth: false },
    { id: 2, nombre: "Outfits", ruta: "celula-2-creador-outfits/index.html", requiereAuth: true },
    { id: 3, nombre: "Armario", ruta: "celula-3-armario-matching/index.html", requiereAuth: true },
    { id: 4, nombre: "Asesoría", ruta: "celula-4-asesoria-imagen-clima/index.html", requiereAuth: true },
    { id: 5, nombre: "Planificador", ruta: "celula-5-planificador-wishlist/index.html", requiereAuth: true },
    { id: 6, nombre: "Comunidad", ruta: "celula-6-comunidad-lookbook-social/index.html", requiereAuth: true },
    { id: 7, nombre: "Mercadeo", ruta: "celula-7-mercadeo-fidelizacion/index.html", requiereAuth: true }
  ];

  function getSesion() {
    try {
      var raw = localStorage.getItem(STORAGE_SESION);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function estaAutenticado() {
    var sesion = getSesion();
    return !!(sesion && sesion.autenticado === true);
  }

  function iniciarSesionDemo() {
    var sesion = { autenticado: true, usuario: "estudiante", rol: "editor" };
    localStorage.setItem(STORAGE_SESION, JSON.stringify(sesion));
    return sesion;
  }

  function cerrarSesion() {
    localStorage.removeItem(STORAGE_SESION);
  }

  function rutaConPrefijo(prefijo, ruta) {
    return (prefijo || "") + ruta;
  }

  function renderNavegacion(idContenedor, moduloActivoId, prefijoRutas) {
    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
      return;
    }
    var autenticado = estaAutenticado();
    var links = modulos.map(function (modulo) {
      var activo = modulo.id === moduloActivoId;
      if (modulo.requiereAuth && !autenticado) {
        return '<a href="#" data-bloqueado="true" title="Requiere autenticación">' + Utilidades.escaparHTML(modulo.nombre) + "</a>";
      }
      return '<a href="' + Utilidades.escaparHTML(rutaConPrefijo(prefijoRutas, modulo.ruta)) + '"' + (activo ? ' aria-current="page"' : "") + ">" + Utilidades.escaparHTML(modulo.nombre) + "</a>";
    }).join("");

    contenedor.innerHTML =
      '<header class="encabezado-principal">' +
      '<div class="contenedor fila">' +
      '<a class="marca" href="' + Utilidades.escaparHTML(rutaConPrefijo(prefijoRutas, "celula-1-catalogo-prendas-marcas/index.html")) + '">Armario <span>Digital</span></a>' +
      '<nav class="navegacion" aria-label="Navegación principal">' + links + "</nav>" +
      '<div class="navegacion">' +
      (autenticado
        ? '<button class="boton boton-secundario" id="btn-cerrar-sesion" type="button">Cerrar sesión</button>'
        : '<button class="boton boton-primario" id="btn-iniciar-sesion" type="button">Iniciar sesión</button>') +
      "</div>" +
      "</div>" +
      "</header>";

    contenedor.querySelectorAll("[data-bloqueado='true']").forEach(function (enlace) {
      enlace.addEventListener("click", function (evento) {
        evento.preventDefault();
        alert("Este módulo requiere autenticación.");
      });
    });

    var iniciar = contenedor.querySelector("#btn-iniciar-sesion");
    if (iniciar) {
      iniciar.addEventListener("click", function () {
        iniciarSesionDemo();
        window.location.reload();
      });
    }

    var cerrar = contenedor.querySelector("#btn-cerrar-sesion");
    if (cerrar) {
      cerrar.addEventListener("click", function () {
        cerrarSesion();
        window.location.href = rutaConPrefijo(prefijoRutas, "celula-1-catalogo-prendas-marcas/index.html");
      });
    }
  }

  function protegerModulo(moduloId, prefijoRutas) {
    var modulo = modulos.find(function (item) { return item.id === moduloId; });
    if (!modulo) {
      return true;
    }
    if (!modulo.requiereAuth) {
      return true;
    }
    if (estaAutenticado()) {
      return true;
    }
    window.location.href = rutaConPrefijo(prefijoRutas, "celula-1-catalogo-prendas-marcas/index.html?auth=requerida");
    return false;
  }

  return {
    getSesion: getSesion,
    estaAutenticado: estaAutenticado,
    iniciarSesionDemo: iniciarSesionDemo,
    cerrarSesion: cerrarSesion,
    renderNavegacion: renderNavegacion,
    protegerModulo: protegerModulo
  };
})();

