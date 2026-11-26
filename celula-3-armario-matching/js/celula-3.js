(async function () {
  if (!AppLayout.protegerModulo(3, "../")) {
    return;
  }
  AppLayout.renderNavegacion("barra-nav", 3, "../");
  var listado = document.getElementById("celula-3-listado");
  var items = await ArmarioMatchingServicio.listar();
  listado.innerHTML = items.map(function (item) {
    return '<article class="tarjeta"><h3>' + Utilidades.escaparHTML(item.prenda) + '</h3><p class="celula-3-chip">Usuario #' + item.usuarioId + "</p></article>";
  }).join("");
})();



/* *=======* Santiago */


/* *=======* */


/* *=======* Janfren */


/* *=======* */

/* *=======* mateo */


/* *=======* */