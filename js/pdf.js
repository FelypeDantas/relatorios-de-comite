/* =========================================================
   📄 PDF GENERATOR
========================================================= */

export async function gerarPDF({
  elemento,
  filename = "relatorio.pdf",
}) {
  if (typeof window.html2pdf === "undefined") {
    alert("html2pdf não encontrado.");
    return;
  }

  if (!elemento) {
    alert("Elemento não encontrado.");
    return;
  }

  try {
    await esperarRenderizacao();

    await html2pdf()
      .set({
        margin: 10,

        filename,

        image: {
          type: "jpeg",
          quality: 1,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },

        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
        },
      })
      .from(elemento)
      .save();
  } catch (error) {
    console.error(error);

    alert(
      "Ocorreu um erro ao gerar o PDF."
    );
  }
}

/* =========================================================
   ⏳ WAIT RENDER
========================================================= */

function esperarRenderizacao() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
