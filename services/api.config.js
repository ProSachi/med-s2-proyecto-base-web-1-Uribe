window.ApiConfig = (function () {
  var config = {
    mode: "local",
    timeoutMs: 7000,
    endpoints: {
      usuariosAutenticacion: "/api/usuarios-autenticacion",
      catalogoPrendasMarcas: "/api/catalogo-prendas-marcas",
      creadorOutfits: "/api/creador-outfits",
      armarioMatching: "/api/armario-matching",
      asesoriaImagenClima: "/api/asesoria-imagen-clima",
      planificadorWishlist: "/api/planificador-wishlist",
      comunidadLookbookSocial: "/api/comunidad-lookbook-social",
      mercadeoFidelizacion: "/api/mercadeo-fidelizacion"
    }
  };

  async function request(endpoint, opciones) {
    var controller = new AbortController();
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, config.timeoutMs);

    try {
      var respuesta = await fetch(endpoint, Object.assign({
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        signal: controller.signal
      }, opciones || {}));

      if (!respuesta.ok) {
        throw new Error("Error HTTP " + respuesta.status + " en " + endpoint);
      }

      return await respuesta.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    get mode() {
      return config.mode;
    },
    setMode: function (mode) {
      if (mode === "local" || mode === "api") {
        config.mode = mode;
      } else {
        throw new Error("Modo inválido. Use 'local' o 'api'.");
      }
    },
    getEndpoint: function (clave) {
      return config.endpoints[clave];
    },
    request: request
  };
})();

