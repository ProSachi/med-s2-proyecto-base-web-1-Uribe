(async function () {
  if (!AppLayout.protegerModulo(6, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 6, "../");
  var listado = document.getElementById("celula-6-listado");
  var registros = await ComunidadLookbookSocialServicio.listar();
  listado.innerHTML = registros.map(function (item) {
    return '<article class="tarjeta"><h3>' + Utilidades.escaparHTML(item.detalle) + '</h3><p class="celula-6-autor">' + Utilidades.escaparHTML(item.usuario) + "</p></article>";
  }).join("");
})();

