import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/* =========================================================
   PDF • COMITÊ DE EVENTOS
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

  if (!container) return [];

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

function adicionarTitulo(doc, texto, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(texto, 14, y);

  return y + 8;
}

function adicionarParagrafo(doc, texto, y) {
  const linhas = doc.splitTextToSize(
    texto || "-",
    180
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(linhas, 14, y);

  return y + linhas.length * 6;
}

export async function gerarPDF({
  filename = "relatorio-comite-eventos.pdf",
} = {}) {
  const doc = new jsPDF();

  const mes = getValue("mes");
  const ano = getValue("ano");

  const resumo =
    getValue("resumo-geral") ||
    "Nenhum resumo informado.";

  const observacoes =
    getValue("observacoes") ||
    "Nenhuma observação registrada.";

  const eventos = coletarEventos();
  const faltas = coletarFaltas();

  /* ======================================================
     CAPA
  ====================================================== */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text(
    "RELATORIO MENSAL",
    105,
    40,
    { align: "center" }
  );

  doc.setFontSize(16);

  doc.text(
    "Comite de Eventos",
    105,
    55,
    { align: "center" }
  );

  doc.setFontSize(12);

  doc.text(
    `Periodo: ${mes}/${ano}`,
    105,
    70,
    { align: "center" }
  );

  doc.line(30, 80, 180, 80);

  doc.setFontSize(10);

  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
    105,
    90,
    { align: "center" }
  );

  /* ======================================================
     NOVA PAGINA
  ====================================================== */

  doc.addPage();

  let y = 20;

  /* ======================================================
     EVENTOS
  ====================================================== */

  y = adicionarTitulo(
    doc,
    "EVENTOS REALIZADOS",
    y
  );

  if (eventos.length) {
    eventos.forEach((evento, index) => {
      autoTable(doc, {
        startY: y,

        head: [[`Evento ${index + 1}`]],

        body: [
          ["Nome", evento.nome],
          ["Criador", evento.criador],
          [
            "Data Programada",
            evento.dataProgramada,
          ],
          ["Data Real", evento.dataReal],
          [
            "Contribuintes",
            evento.contribuintes,
          ],
          [
            "Informacoes Adversas",
            evento.adversidades,
          ],
          ["Vencedor", evento.vencedor],
          ["Premio", evento.premio],
        ],

        theme: "grid",

        styles: {
          fontSize: 10,
          cellPadding: 3,
        },

        headStyles: {
          fillColor: [109, 40, 217],
        },
      });

      y = doc.lastAutoTable.finalY + 10;
    });
  } else {
    y = adicionarParagrafo(
      doc,
      "Nenhum evento registrado.",
      y
    );
  }

  /* ======================================================
     RESUMO
  ====================================================== */

  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  y = adicionarTitulo(
    doc,
    "RESUMO GERAL",
    y + 10
  );

  y = adicionarParagrafo(
    doc,
    resumo,
    y
  );

  /* ======================================================
     FALTAS
  ====================================================== */

  if (y > 180) {
    doc.addPage();
    y = 20;
  }

  y = adicionarTitulo(
    doc,
    "FALTAS REGISTRADAS",
    y + 10
  );

  if (faltas.length) {
    autoTable(doc, {
      startY: y,

      head: [[
        "Membro",
        "Ocorrido",
        "Qtd.",
        "Advertencia"
      ]],

      body: faltas.map((f) => [
        f.membro,
        f.ocorrido,
        f.quantidade,
        f.advertencia,
      ]),

      theme: "striped",

      styles: {
        fontSize: 10,
      },

      headStyles: {
        fillColor: [185, 28, 28],
      },
    });

    y = doc.lastAutoTable.finalY + 10;
  } else {
    y = adicionarParagrafo(
      doc,
      "Nenhuma falta registrada.",
      y
    );
  }

  /* ======================================================
     OBSERVACOES
  ====================================================== */

  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  y = adicionarTitulo(
    doc,
    "OBSERVACOES FINAIS",
    y + 10
  );

  adicionarParagrafo(
    doc,
    observacoes,
    y
  );

  /* ======================================================
     RODAPE
  ====================================================== */

  const paginas = doc.getNumberOfPages();

  for (let i = 1; i <= paginas; i++) {
    doc.setPage(i);

    doc.setFontSize(9);

    doc.text(
      `Pagina ${i} de ${paginas}`,
      105,
      290,
      { align: "center" }
    );
  }

  doc.save(filename);
}
