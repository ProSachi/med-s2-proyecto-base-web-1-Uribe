(async function () {
  if (!AppLayout.protegerModulo(2, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 2, "../");
  var listado = document.getElementById("celula-2-listado");
  var outfits = await CreadorOutfitsServicio.listar();
  listado.innerHTML = outfits.map(function (outfit) {
    return '<article class="tarjeta"><h3>' + Utilidades.escaparHTML(outfit.nombre) + '</h3><p>Ocasión: ' + Utilidades.escaparHTML(outfit.ocasion) + '</p><p class="celula-2-estado">' + Utilidades.escaparHTML(outfit.estado) + '</p></article>';
  }).join("");
})();

