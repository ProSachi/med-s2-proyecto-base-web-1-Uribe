(async function () {
  if (!AppLayout.protegerModulo(7, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 7, "../");
  var listado = document.getElementById("celula-7-listado");
  var registros = await MercadeoFidelizacionServicio.listar();
  listado.innerHTML = registros.map(function (item) {
    return '<article class="tarjeta"><h3>' + Utilidades.escaparHTML(item.campana) + '</h3><p>' + Utilidades.escaparHTML(item.tipo) + '</p><p class="celula-7-estado">' + Utilidades.escaparHTML(item.estado) + "</p></article>";
  }).join("");
})();

