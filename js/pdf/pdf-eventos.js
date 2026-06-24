const { jsPDF } = window.jspdf;

/* =========================================================
   HELPERS
========================================================= */

function getValue(id) {
  return document.querySelector(`#${id}`)?.value?.trim() || "";
}

function coletarEventos() {
  return [...document.querySelectorAll(".event-card")].map((card) => {
    const inputs = card.querySelectorAll("input");
    const textareas = card.querySelectorAll("textarea");

    return {
      nome: inputs[0]?.value || "",
      criador: inputs[1]?.value || "",
      dataProgramada: inputs[2]?.value || "",
      dataReal: inputs[3]?.value || "",
      vencedor: inputs[4]?.value || "",
      premio: inputs[5]?.value || "",
      contribuintes: textareas[0]?.value || "",
      adversidades: textareas[1]?.value || "",
    };
  });
}

function coletarFaltas() {
  const container =
    document.querySelector("#faltas-container");

  return [...container.children].map((card) => {
    const campos =
      card.querySelectorAll("input, select");

    return {
      membro: campos[0]?.value || "",
      ocorrido: campos[1]?.value || "",
      quantidade: campos[2]?.value || "",
      advertencia: campos[3]?.value || "",
    };
  });
}

function caixa(doc, x, y, w, h) {
  doc.roundedRect(
    x,
    y,
    w,
    h,
    4,
    4
  );
}

function escreverMultilinha(
  doc,
  texto,
  x,
  y,
  largura
) {
  const linhas =
    doc.splitTextToSize(
      texto || "-",
      largura
    );

  doc.text(
    linhas,
    x,
    y
  );

  return linhas.length * 6;
}

/* =========================================================
   PDF
========================================================= */

export async function gerarPDF({
  filename =
    "relatorio-comite-eventos.pdf",
} = {}) {
  const doc =
    new jsPDF("p", "mm", "a4");

  const mes =
    getValue("mes");

  const ano =
    getValue("ano");

  const resumo =
    getValue(
      "resumo-geral"
    ) ||
    "Nenhum resumo informado.";

  const observacoes =
    getValue(
      "observacoes"
    ) ||
    "Nenhuma observação registrada.";

  const eventos =
    coletarEventos();

  const faltas =
    coletarFaltas();

  let y = 20;

  /* ======================================
     CAPA
  ====================================== */

  doc.setFillColor(
    80,
    20,
    120
  );

  doc.rect(
    0,
    0,
    210,
    297,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFontSize(28);

  doc.text(
    "SANGUE CARMESIM",
    105,
    70,
    {
      align:
        "center",
    }
  );

  doc.setFontSize(18);

  doc.text(
    "COMITE DE EVENTOS",
    105,
    90,
    {
      align:
        "center",
    }
  );

  doc.setFontSize(12);

  doc.text(
    `${mes}/${ano}`,
    105,
    105,
    {
      align:
        "center",
    }
  );

  doc.addPage();

  /* ======================================
     RESUMO
  ====================================== */

  doc.setTextColor(
    20,
    20,
    20
  );

  y = 20;

  doc.setFontSize(20);

  doc.text(
    "Resumo Geral",
    15,
    y
  );

  y += 12;

  doc.setFontSize(11);

  y += escreverMultilinha(
    doc,
    resumo,
    15,
    y,
    180
  );

  y += 15;

  /* ======================================
     EVENTOS
  ====================================== */

  doc.setFontSize(20);

  doc.text(
    "Eventos",
    15,
    y
  );

  y += 10;

  eventos.forEach(
    (
      evento,
      index
    ) => {
      if (
        y > 220
      ) {
        doc.addPage();
        y = 20;
      }

      caixa(
        doc,
        10,
        y,
        190,
        45
      );

      doc.setFontSize(
        14
      );

      doc.text(
        `Evento ${
          index + 1
        }`,
        15,
        y + 8
      );

      doc.setFontSize(
        10
      );

      doc.text(
        `Nome: ${evento.nome}`,
        15,
        y + 16
      );

      doc.text(
        `Criador: ${evento.criador}`,
        15,
        y + 22
      );

      doc.text(
        `Programado: ${evento.dataProgramada}`,
        15,
        y + 28
      );

      doc.text(
        `Real: ${evento.dataReal}`,
        15,
        y + 34
      );

      doc.text(
        `Vencedor: ${evento.vencedor}`,
        100,
        y + 16
      );

      doc.text(
        `Premio: ${evento.premio}`,
        100,
        y + 22
      );

      y += 55;
    }
  );

  /* ======================================
     FALTAS
  ====================================== */

  doc.addPage();

  y = 20;

  doc.setFontSize(20);

  doc.text(
    "Faltas",
    15,
    y
  );

  y += 15;

  faltas.forEach(
    (falta) => {
      caixa(
        doc,
        10,
        y,
        190,
        30
      );

      doc.setFontSize(
        11
      );

      doc.text(
        `Membro: ${falta.membro}`,
        15,
        y + 10
      );

      doc.text(
        `Ocorrido: ${falta.ocorrido}`,
        15,
        y + 18
      );

      doc.text(
        `Qtd: ${falta.quantidade}`,
        120,
        y + 10
      );

      doc.text(
        `Advertencia: ${falta.advertencia}`,
        120,
        y + 18
      );

      y += 40;
    }
  );

  /* ======================================
     OBSERVACOES
  ====================================== */

  doc.addPage();

  y = 20;

  doc.setFontSize(20);

  doc.text(
    "Observacoes Finais",
    15,
    y
  );

  y += 15;

  doc.setFontSize(11);

  escreverMultilinha(
    doc,
    observacoes,
    15,
    y,
    180
  );

  /* ======================================
     RODAPE
  ====================================== */

  const total =
    doc.getNumberOfPages();

  for (
    let i = 1;
    i <= total;
    i++
  ) {
    doc.setPage(i);

    doc.setFontSize(9);

    doc.text(
      `${i}/${total}`,
      190,
      290
    );
  }

  doc.save(
    filename
  );
}
