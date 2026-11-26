(async function () {
  if (!AppLayout.protegerModulo(5, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 5, "../");
  var listado = document.getElementById("celula-5-listado");
  var registros = await PlanificadorWishlistServicio.listar();
  listado.innerHTML = registros.map(function (item) {
    return '<article class="tarjeta"><h3>' + Utilidades.escaparHTML(item.nombre) + '</h3><p class="celula-5-tipo">' + Utilidades.escaparHTML(item.tipo) + "</p></article>";
  }).join("");
})();

