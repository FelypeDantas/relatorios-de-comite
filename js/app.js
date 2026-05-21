/* =========================================================
   🩸 SANGUE CARMESIM • COMITÊ DE ATENDIMENTO
========================================================= */

/* =========================================================
   📦 DOM
========================================================= */

const DOM = {
  semanas: [
    ...document.querySelectorAll(
      "[data-semana]"
    ),
  ],

  addADMButtons: [
    ...document.querySelectorAll(
      "[data-add-adm]"
    ),
  ],

  faltasContainer:
    document.querySelector(
      "#faltas-container"
    ),

  addFaltaButton:
    document.querySelector(
      "#add-falta"
    ),

  gerarPDFButton:
    document.querySelector(
      "#gerar-pdf"
    ),
};

/* =========================================================
   ⚙️ CONFIG
========================================================= */

const CONFIG = {
  MAX_ADMS: 20,

  PDF: {
    filename:
      "relatorio-atendimento.pdf",

    margin: 0.5,

    scale: 2,
  },
};

/* =========================================================
   🎨 STYLES
========================================================= */

const STYLES = {
  input:
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white transition-all focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-900/20",

  card:
    "adm-card bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 animate-fade",

  removeButton:
    "mt-6 w-full bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all",
};

/* =========================================================
   🧠 HELPERS
========================================================= */

function createElement(
  tag,
  className = ""
) {
  const element =
    document.createElement(tag);

  if (className) {
    element.className =
      className;
  }

  return element;
}

function createInput({
  type = "text",
  placeholder = "",
} = {}) {
  const input =
    createElement(
      "input",
      STYLES.input
    );

  input.type = type;

  input.placeholder =
    placeholder;

  return input;
}

function createSelect(
  options = []
) {
  const select =
    createElement(
      "select",
      STYLES.input
    );

  options.forEach((text) => {
    const option =
      document.createElement(
        "option"
      );

    option.value = text;

    option.textContent =
      text;

    select.appendChild(option);
  });

  return select;
}

function createLabel(text) {
  const label =
    createElement(
      "label",
      "block text-sm text-zinc-400 mb-2"
    );

  label.textContent =
    text;

  return label;
}

function createField({
  label,
  input,
}) {
  const wrapper =
    createElement("div");

  wrapper.append(
    createLabel(label),
    input
  );

  return wrapper;
}

function createGrid(
  columns = 3
) {
  return createElement(
    "div",
    `grid grid-cols-1 lg:grid-cols-${columns} gap-6`
  );
}

function createRemoveButton(
  onClick
) {
  const button =
    createElement(
      "button",
      STYLES.removeButton
    );

  button.type = "button";

  button.textContent =
    "Remover";

  button.addEventListener(
    "click",
    onClick
  );

  return button;
}

/* =========================================================
   👥 CARD ADM
========================================================= */

function createADMCard() {
  const card =
    createElement(
      "div",
      STYLES.card
    );

  const grid =
    createGrid(3);

  const fields = [
    {
      label: "ADM",

      input: createInput({
        placeholder:
          "Nome do ADM",
      }),
    },

    {
      label:
        "Contribuição",

      input: createInput({
        placeholder:
          "Ex: 15 atendimentos",
      }),
    },

    {
      label:
        "Prazo cumprido?",

      input: createSelect([
        "Selecione",
        "Sim",
        "Não",
      ]),
    },
  ];

  fields.forEach(
    (field) => {
      grid.appendChild(
        createField(field)
      );
    }
  );

  card.appendChild(grid);

  card.appendChild(
    createRemoveButton(() =>
      card.remove()
    )
  );

  return card;
}

/* =========================================================
   ⚠️ CARD FALTA
========================================================= */

function createFaltaCard() {
  const card =
    createElement(
      "div",
      STYLES.card
    );

  const grid =
    createGrid(4);

  const fields = [
    {
      label: "ADM",

      input: createInput({
        placeholder:
          "Nome do ADM",
      }),
    },

    {
      label:
        "O que aconteceu?",

      input: createInput({
        placeholder:
          "Descrição da ocorrência",
      }),
    },

    {
      label: "Quantidade",

      input: createInput({
        type: "number",
        placeholder: "0",
      }),
    },

    {
      label:
        "Advertência?",

      input: createSelect([
        "Selecione",
        "Sim",
        "Não",
      ]),
    },
  ];

  fields.forEach(
    (field) => {
      grid.appendChild(
        createField(field)
      );
    }
  );

  card.appendChild(grid);

  card.appendChild(
    createRemoveButton(() =>
      card.remove()
    )
  );

  return card;
}

/* =========================================================
   📊 DATA
========================================================= */

function getCardInputs(card) {
  return [
    ...card.querySelectorAll(
      "input, select"
    ),
  ];
}

function coletarSemanas() {
  return DOM.semanas.map(
    (semana) => {
      const cards = [
        ...semana.querySelectorAll(
          ".adm-card"
        ),
      ];

      return cards.map(
        (card) => {
          const inputs =
            getCardInputs(
              card
            );

          return {
            adm:
              inputs[0]
                ?.value || "",

            contribuicao:
              inputs[1]
                ?.value || "",

            prazo:
              inputs[2]
                ?.value || "",
          };
        }
      );
    }
  );
}

function coletarFaltas() {
  if (
    !DOM.faltasContainer
  ) {
    return [];
  }

  const cards = [
    ...DOM.faltasContainer.querySelectorAll(
      ".adm-card"
    ),
  ];

  return cards.map(
    (card) => {
      const inputs =
        getCardInputs(
          card
        );

      return {
        adm:
          inputs[0]
            ?.value || "",

        ocorrido:
          inputs[1]
            ?.value || "",

        quantidade:
          inputs[2]
            ?.value || "",

        advertencia:
          inputs[3]
            ?.value || "",
      };
    }
  );
}

function gerarMetricas() {
  const semanas =
    coletarSemanas();

  const faltas =
    coletarFaltas();

  let totalADMS = 0;

  let totalCumpridos = 0;

  let totalNaoCumpridos = 0;

  semanas.forEach(
    (semana) => {
      semana.forEach(
        (registro) => {
          totalADMS++;

          if (
            registro.prazo ===
            "Sim"
          ) {
            totalCumpridos++;
          }

          if (
            registro.prazo ===
            "Não"
          ) {
            totalNaoCumpridos++;
          }
        }
      );
    }
  );

  return {
    totalADMS,

    totalCumpridos,

    totalNaoCumpridos,

    totalFaltas:
      faltas.length,

    desempenho:
      totalCumpridos >=
      totalNaoCumpridos
        ? "Bom desempenho operacional."
        : "Necessidade de melhorias operacionais.",
  };
}

/* =========================================================
   📄 TEMPLATE PDF
========================================================= */

function gerarRelatorioHTML() {
  const metricas =
    gerarMetricas();

  return `
    <div
      style="
        padding: 48px;
        font-family: Arial, sans-serif;
        color: #111;
      "
    >

      <h1
        style="
          font-size: 32px;
          margin-bottom: 8px;
        "
      >
        Relatório Mensal
      </h1>

      <p
        style="
          color: #666;
          margin-bottom: 32px;
        "
      >
        Comitê de Atendimento • Sangue Carmesim
      </p>

      <hr />

      <h2
        style="
          margin-top: 30px;
        "
      >
        Métricas gerais
      </h2>

      <ul
        style="
          line-height: 1.8;
        "
      >
        <li>
          Total de registros:
          ${metricas.totalADMS}
        </li>

        <li>
          Prazos cumpridos:
          ${metricas.totalCumpridos}
        </li>

        <li>
          Prazos não cumpridos:
          ${metricas.totalNaoCumpridos}
        </li>

        <li>
          Faltas registradas:
          ${metricas.totalFaltas}
        </li>
      </ul>

      <h2
        style="
          margin-top: 30px;
        "
      >
        Análise automática
      </h2>

      <p>
        ${metricas.desempenho}
      </p>

    </div>
  `;
}

/* =========================================================
   📄 PDF
========================================================= */

/* =========================================================
   📄 PDF
========================================================= */

async function gerarPDF() {
  if (typeof html2pdf === "undefined") {
    alert("Biblioteca html2pdf não encontrada.");
    return;
  }

  const relatorioHTML = gerarRelatorioHTML();

  /* =========================================================
     📦 CONTAINER TEMPORÁRIO
  ========================================================= */

  const pdfContainer = document.createElement("div");

  pdfContainer.id = "pdf-content";

  pdfContainer.style.position = "fixed";
  pdfContainer.style.left = "-99999px";
  pdfContainer.style.top = "0";

  pdfContainer.style.width = "794px";
  pdfContainer.style.minHeight = "1123px";

  pdfContainer.style.background = "#ffffff";
  pdfContainer.style.color = "#111111";

  pdfContainer.style.padding = "40px";

  pdfContainer.style.fontFamily =
    "Arial, sans-serif";

  pdfContainer.innerHTML = relatorioHTML;

  document.body.appendChild(pdfContainer);

  /* =========================================================
     ⏳ AGUARDA RENDERIZAÇÃO
  ========================================================= */

  await new Promise((resolve) =>
    requestAnimationFrame(resolve)
  );

  /* =========================================================
     ⚙️ OPTIONS
  ========================================================= */

  const options = {
    margin: 10,

    filename:
      CONFIG.PDF.filename,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  /* =========================================================
     🚀 GERA PDF
  ========================================================= */

  try {
    await html2pdf()
      .set(options)
      .from(pdfContainer)
      .save();
  } catch (error) {
    console.error(
      "Erro ao gerar PDF:",
      error
    );

    alert(
      "Erro ao gerar relatório PDF."
    );
  } finally {
    pdfContainer.remove();
  }
}

/* =========================================================
   🚀 EVENTS
========================================================= */

function adicionarADM(
  semanaId
) {
  const container =
    document.querySelector(
      `[data-semana="${semanaId}"]`
    );

  if (!container)
    return;

  if (
    container.children
      .length >=
    CONFIG.MAX_ADMS
  ) {
    alert(
      "Limite máximo de ADMs atingido."
    );

    return;
  }

  container.appendChild(
    createADMCard()
  );
}

DOM.addADMButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        adicionarADM(
          button.dataset
            .addAdm
        );
      }
    );
  }
);

DOM.addFaltaButton?.addEventListener(
  "click",
  () => {
    DOM.faltasContainer?.appendChild(
      createFaltaCard()
    );
  }
);

DOM.gerarPDFButton?.addEventListener(
  "click",
  async (event) => {
    event.preventDefault();

    const originalText =
      DOM.gerarPDFButton
        .innerHTML;

    try {
      DOM.gerarPDFButton.disabled =
        true;

      DOM.gerarPDFButton.innerHTML =
        "Gerando relatório...";

      await gerarPDF();
    } finally {
      DOM.gerarPDFButton.disabled =
        false;

      DOM.gerarPDFButton.innerHTML =
        originalText;
    }
  }
);

/* =========================================================
   ⚡ INIT
========================================================= */

DOM.semanas.forEach(
  (semana) => {
    semana.appendChild(
      createADMCard()
    );
  }
);

DOM.faltasContainer?.appendChild(
  createFaltaCard()
);

console.log(
  "%c🩸 Sistema Carmesim iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);
