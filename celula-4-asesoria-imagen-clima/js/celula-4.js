(async function () {
  if (!AppLayout.protegerModulo(4, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 4, "../");
  var listado = document.getElementById("celula-4-listado");
  var registros = await AsesoriaImagenClimaServicio.listar();
  listado.innerHTML = registros.map(function (item) {
    return '<article class="tarjeta"><h3 class="celula-4-dresscode">' + Utilidades.escaparHTML(item.dressCode) + '</h3><p>Clima: ' + Utilidades.escaparHTML(item.clima) + "</p></article>";
  }).join("");
})();

