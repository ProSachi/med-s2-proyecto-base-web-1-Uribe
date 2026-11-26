window.ModulosServicios = (function () {
  var repositorioLocal = {
    usuariosAutenticacion: (window.DATOS_USUARIOS_AUTENTICACION || []).slice(),
    catalogoPrendasMarcas: (window.DATOS_CATALOGO_PRENDAS_MARCAS || []).slice(),
    creadorOutfits: (window.DATOS_CREADOR_OUTFITS || []).slice(),
    armarioMatching: (window.DATOS_ARMARIO_MATCHING || []).slice(),
    asesoriaImagenClima: (window.DATOS_ASESORIA_IMAGEN_CLIMA || []).slice(),
    planificadorWishlist: (window.DATOS_PLANIFICADOR_WISHLIST || []).slice(),
    comunidadLookbookSocial: (window.DATOS_COMUNIDAD_LOOKBOOK_SOCIAL || []).slice(),
    mercadeoFidelizacion: (window.DATOS_MERCADEO_FIDELIZACION || []).slice()
  };

  function clonar(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function siguienteId(coleccion) {
    if (!coleccion.length) {
      return 1;
    }
    return Math.max.apply(null, coleccion.map(function (item) { return Number(item.id) || 0; })) + 1;
  }

  function crearValidacion(nombreEntidad, camposRequeridos) {
    return {
      async validarRegistro(registro) {
        try {
          if (!registro || typeof registro !== "object") {
            throw new Error("Registro inválido en " + nombreEntidad + ".");
          }
          camposRequeridos.forEach(function (campo) {
            if (registro[campo] == null || String(registro[campo]).trim() === "") {
              throw new Error("Campo requerido faltante: " + campo + ".");
            }
          });
          return true;
        } catch (error) {
          throw new Error(nombreEntidad + "Validacion: " + error.message);
        }
      }
    };
  }

  function crearServicio(claveEntidad, validacion) {
    return {
      async listar() {
        try {
          if (ApiConfig.mode === "local") {
            return clonar(repositorioLocal[claveEntidad]);
          }
          return await ApiConfig.request(ApiConfig.getEndpoint(claveEntidad));
        } catch (error) {
          throw new Error(claveEntidad + "Servicio.listar: " + error.message);
        }
      },
      async obtenerPorId(id) {
        try {
          var idNumero = Number(id);
          if (ApiConfig.mode === "local") {
            var item = repositorioLocal[claveEntidad].find(function (registro) {
              return Number(registro.id) === idNumero;
            });
            return item ? clonar(item) : null;
          }
          return await ApiConfig.request(ApiConfig.getEndpoint(claveEntidad) + "/" + idNumero);
        } catch (error) {
          throw new Error(claveEntidad + "Servicio.obtenerPorId: " + error.message);
        }
      },
      async crear(registro) {
        try {
          await validacion.validarRegistro(registro);
          if (ApiConfig.mode === "local") {
            var nuevo = Object.assign({}, registro, { id: siguienteId(repositorioLocal[claveEntidad]) });
            repositorioLocal[claveEntidad].push(nuevo);
            return clonar(nuevo);
          }
          return await ApiConfig.request(ApiConfig.getEndpoint(claveEntidad), {
            method: "POST",
            body: JSON.stringify(registro)
          });
        } catch (error) {
          throw new Error(claveEntidad + "Servicio.crear: " + error.message);
        }
      },
      async actualizar(id, cambios) {
        try {
          await validacion.validarRegistro(cambios);
          var idNumero = Number(id);
          if (ApiConfig.mode === "local") {
            var indice = repositorioLocal[claveEntidad].findIndex(function (registro) {
              return Number(registro.id) === idNumero;
            });
            if (indice === -1) {
              throw new Error("Registro no encontrado.");
            }
            repositorioLocal[claveEntidad][indice] = Object.assign({}, repositorioLocal[claveEntidad][indice], cambios, { id: idNumero });
            return clonar(repositorioLocal[claveEntidad][indice]);
          }
          return await ApiConfig.request(ApiConfig.getEndpoint(claveEntidad) + "/" + idNumero, {
            method: "PUT",
            body: JSON.stringify(cambios)
          });
        } catch (error) {
          throw new Error(claveEntidad + "Servicio.actualizar: " + error.message);
        }
      },
      async eliminar(id) {
        try {
          var idNumero = Number(id);
          if (ApiConfig.mode === "local") {
            var indice = repositorioLocal[claveEntidad].findIndex(function (registro) {
              return Number(registro.id) === idNumero;
            });
            if (indice === -1) {
              throw new Error("Registro no encontrado.");
            }
            var eliminado = repositorioLocal[claveEntidad].splice(indice, 1)[0];
            return clonar(eliminado);
          }
          return await ApiConfig.request(ApiConfig.getEndpoint(claveEntidad) + "/" + idNumero, {
            method: "DELETE"
          });
        } catch (error) {
          throw new Error(claveEntidad + "Servicio.eliminar: " + error.message);
        }
      }
    };
  }

  var UsuariosAutenticacionValidacion = crearValidacion("UsuariosAutenticacion", ["nombre", "correo", "rol"]);
  var CatalogoPrendasMarcasValidacion = crearValidacion("CatalogoPrendasMarcas", ["marca", "nombrePrenda"]);
  var CreadorOutfitsValidacion = crearValidacion("CreadorOutfits", ["nombre", "ocasion"]);
  var ArmarioMatchingValidacion = crearValidacion("ArmarioMatching", ["usuarioId", "prenda"]);
  var AsesoriaImagenClimaValidacion = crearValidacion("AsesoriaImagenClima", ["usuarioId", "dressCode", "clima"]);
  var PlanificadorWishlistValidacion = crearValidacion("PlanificadorWishlist", ["tipo", "nombre"]);
  var ComunidadLookbookSocialValidacion = crearValidacion("ComunidadLookbookSocial", ["usuario", "accion"]);
  var MercadeoFidelizacionValidacion = crearValidacion("MercadeoFidelizacion", ["campana", "tipo"]);

  var api = {
    UsuariosAutenticacionServicio: crearServicio("usuariosAutenticacion", UsuariosAutenticacionValidacion),
    CatalogoPrendasMarcasServicio: crearServicio("catalogoPrendasMarcas", CatalogoPrendasMarcasValidacion),
    CreadorOutfitsServicio: crearServicio("creadorOutfits", CreadorOutfitsValidacion),
    ArmarioMatchingServicio: crearServicio("armarioMatching", ArmarioMatchingValidacion),
    AsesoriaImagenClimaServicio: crearServicio("asesoriaImagenClima", AsesoriaImagenClimaValidacion),
    PlanificadorWishlistServicio: crearServicio("planificadorWishlist", PlanificadorWishlistValidacion),
    ComunidadLookbookSocialServicio: crearServicio("comunidadLookbookSocial", ComunidadLookbookSocialValidacion),
    MercadeoFidelizacionServicio: crearServicio("mercadeoFidelizacion", MercadeoFidelizacionValidacion),
    UsuariosAutenticacionValidacion: UsuariosAutenticacionValidacion,
    CatalogoPrendasMarcasValidacion: CatalogoPrendasMarcasValidacion,
    CreadorOutfitsValidacion: CreadorOutfitsValidacion,
    ArmarioMatchingValidacion: ArmarioMatchingValidacion,
    AsesoriaImagenClimaValidacion: AsesoriaImagenClimaValidacion,
    PlanificadorWishlistValidacion: PlanificadorWishlistValidacion,
    ComunidadLookbookSocialValidacion: ComunidadLookbookSocialValidacion,
    MercadeoFidelizacionValidacion: MercadeoFidelizacionValidacion
  };

  Object.keys(api).forEach(function (clave) {
    window[clave] = api[clave];
  });

  return api;
})();

