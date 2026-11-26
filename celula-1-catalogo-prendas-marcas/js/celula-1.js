(async function () {
  AppLayout.renderNavegacion("barra-nav", 1, "../");
  var formulario = document.getElementById("celula-1-formulario");
  var listado = document.getElementById("celula-1-listado");
  var parametros = new URLSearchParams(window.location.search);
  if (parametros.get("auth") === "requerida") {
    alert("Para entrar a los demás módulos primero tenés que iniciar sesión.");
  }

  function leerFormulario() {
    var datos = new FormData(formulario);
    return {
      marca: Utilidades.asegurarTexto(datos.get("marca")),
      nombrePrenda: Utilidades.asegurarTexto(datos.get("nombrePrenda")),
      coleccion: Utilidades.asegurarTexto(datos.get("coleccion")),
      activo: String(datos.get("activo")) === "true"
    };
  }

  async function render() {
    var registros = await CatalogoPrendasMarcasServicio.listar();
    listado.innerHTML = registros.map(function (item) {
      return (
        '<article class="tarjeta">' +
        "<h3>" + Utilidades.escaparHTML(item.nombrePrenda) + "</h3>" +
        "<p>Marca: " + Utilidades.escaparHTML(item.marca) + "</p>" +
        '<p><span class="celula-1-tag">' + Utilidades.escaparHTML(item.coleccion) + "</span></p>" +
        '<p class="texto-secundario">ID: ' + item.id + " · " + (item.activo ? "Activo" : "Inactivo") + "</p>" +
        '<button class="boton boton-primario" data-editar="' + item.id + '">Actualizar</button> ' +
        '<button class="boton" data-eliminar="' + item.id + '">Eliminar</button>' +
        "</article>"
      );
    }).join("");

    listado.querySelectorAll("[data-eliminar]").forEach(function (boton) {
      boton.addEventListener("click", async function () {
        await CatalogoPrendasMarcasServicio.eliminar(boton.getAttribute("data-eliminar"));
        await render();
      });
    });

    listado.querySelectorAll("[data-editar]").forEach(function (boton) {
      boton.addEventListener("click", async function () {
        var id = boton.getAttribute("data-editar");
        var actual = await CatalogoPrendasMarcasServicio.obtenerPorId(id);
        if (!actual) {
          return;
        }
        var nuevoNombre = prompt("Nuevo nombre de prenda:", actual.nombrePrenda);
        if (!nuevoNombre) {
          return;
        }
        await CatalogoPrendasMarcasServicio.actualizar(id, {
          marca: actual.marca,
          nombrePrenda: Utilidades.asegurarTexto(nuevoNombre),
          coleccion: actual.coleccion,
          activo: actual.activo
        });
        await render();
      });
    });
  }

  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    var nuevo = leerFormulario();
    try {
      await CatalogoPrendasMarcasValidacion.validarRegistro(nuevo);
      await CatalogoPrendasMarcasServicio.crear(nuevo);
      formulario.reset();
      await render();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear el registro.");
    }
  });

  await render();
})();

