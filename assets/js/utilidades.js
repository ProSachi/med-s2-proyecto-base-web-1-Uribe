window.Utilidades = (function () {
  function asegurarTexto(valor) {
    return (valor == null ? "" : String(valor)).normalize("NFC");
  }

  function normalizarBusqueda(valor) {
    return asegurarTexto(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function contieneTexto(base, termino) {
    return normalizarBusqueda(base).indexOf(normalizarBusqueda(termino)) !== -1;
  }

  function escaparHTML(texto) {
    return asegurarTexto(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatoMonedaCOP(valor) {
    var numero = Number(valor || 0);
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(numero);
  }

  function formatoFechaCorta(valor) {
    var fecha = valor instanceof Date ? valor : new Date(valor);
    if (isNaN(fecha.getTime())) {
      return "";
    }
    return fecha.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function crearNodo(etiqueta, clases, texto) {
    var nodo = document.createElement(etiqueta);
    if (clases) {
      nodo.className = clases;
    }
    if (texto != null) {
      nodo.textContent = asegurarTexto(texto);
    }
    return nodo;
  }

  return {
    asegurarTexto: asegurarTexto,
    normalizarBusqueda: normalizarBusqueda,
    contieneTexto: contieneTexto,
    escaparHTML: escaparHTML,
    formatoMonedaCOP: formatoMonedaCOP,
    formatoFechaCorta: formatoFechaCorta,
    crearNodo: crearNodo
  };
})();

