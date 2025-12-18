function copiarCodigo(id) {
  console.log(id);
  const codigo = document.getElementById(id).innerText;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(codigo)
      .then(() => {
        // Mostrar notificación temporal
        const boton = event.target.closest(".copy-btn");
        const originalText = boton.innerHTML;
        boton.innerHTML = "¡Copiado!";
        boton.style.backgroundColor = "rgba(0, 200, 0, 0.9)";

        setTimeout(() => {
          boton.innerHTML = originalText;
          boton.style.backgroundColor = "";
        }, 2000);
      })
      .catch(() => {
        copiarFallback(codigo);
      });
  } else {
    copiarFallback(codigo);
  }
}

function copiarFallback(texto) {
  const textarea = document.createElement("textarea");
  textarea.value = texto;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  try {
    document.execCommand("copy");
    alert("Código copiado al portapapeles!");
  } catch (err) {
    alert("No se pudo copiar automáticamente. Copia manualmente.");
  }
  document.body.removeChild(textarea);
}

// Reaplicar highlight.js después de copiar (por si hay cambios dinámicos)
document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
});
