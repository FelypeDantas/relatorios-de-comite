/* =========================================================
   🩸 SANGUE CARMESIM • ATENDIMENTO
========================================================= */

const DOM = {
  semanas:
    document.querySelectorAll(
      "[data-semana]"
    ),

  faltas:
    document.querySelector(
      "#faltas-container"
    ),

  gerarPDF:
    document.querySelector(
      "#gerar-pdf"
    ),

  addADMButtons:
    document.querySelectorAll(
      "[data-add-adm]"
    ),

  addFalta:
    document.querySelector(
      "#add-falta"
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

    margin: 0.3,

    scale: 2,
  },
};

/* =========================================================
   🎨 CLASSES
========================================================= */

const CLASSES = {
  input:
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white transition-all focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-900/20",

  card:
    "bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 animate-fade",

  remove:
    "mt-6 w-full bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all",
};

/* =========================================================
   🧠 HELPERS
========================================================= */

const createElement = (
  tag,
  className = ""
) => {
  const element =
    document.createElement(tag);

  if (className) {
    element.className =
      className;
  }

  return element;
};

const createInput = ({
  type = "text",
  placeholder = "",
} = {}) => {
  const input =
    createElement(
      "input",
      CLASSES.input
    );

  input.type = type;

  input.placeholder =
    placeholder;

  return input;
};

const createSelect = (
  options = []
) => {
  const select =
    createElement(
      "select",
      CLASSES.input
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
};

const createLabel = (
  text
) => {
  const label =
    createElement(
      "label",
      "block text-sm text-zinc-400 mb-2"
    );

  label.textContent =
    text;

  return label;
};

const createField = ({
  label,
  input,
}) => {
  const wrapper =
    createElement("div");

  wrapper.append(
    createLabel(label),
    input
  );

  return wrapper;
};

const createRemoveButton = (
  callback
) => {
  const button =
    createElement(
      "button",
      CLASSES.remove
    );

  button.type = "button";

  button.textContent =
    "Remover";

  button.addEventListener(
    "click",
    callback
  );

  return button;
};

const createGrid = (
  columns = 3
) => {
  return createElement(
    "div",
    `grid grid-cols-1 lg:grid-cols-${columns} gap-6`
  );
};

/* =========================================================
   👥 ADM CARD
========================================================= */

function createADMCard() {
  const card =
    createElement(
      "div",
      CLASSES.card
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
   ⚠️ FALTA CARD
========================================================= */

function createFaltaCard() {
  const card =
    createElement(
      "div",
      CLASSES.card
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

function coletarSemanas() {
  return [
    ...DOM.semanas,
  ].map((semana) => {
    const cards =
      semana.querySelectorAll(
        `.${CLASSES.card
          .split(" ")
          .join(".")}`
      );

    return [...cards].map(
      (card) => {
        const inputs =
          card.querySelectorAll(
            "input, select"
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
  });
}

function coletarFaltas() {
  if (!DOM.faltas)
    return [];

  const cards =
    DOM.faltas.querySelectorAll(
      `.${CLASSES.card
        .split(" ")
        .join(".")}`
    );

  return [...cards].map(
    (card) => {
      const inputs =
        card.querySelectorAll(
          "input, select"
        );

      return {
        adm:
          inputs[0]?.value || "",

        ocorrido:
          inputs[1]?.value || "",

        quantidade:
          inputs[2]?.value || "",

        advertencia:
          inputs[3]?.value || "",
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

  let cumpridos = 0;

  let naoCumpridos = 0;

  semanas.forEach(
    (semana) => {
      semana.forEach(
        (registro) => {
          totalADMS++;

          if (
            registro.prazo ===
            "Sim"
          ) {
            cumpridos++;
          }

          if (
            registro.prazo ===
            "Não"
          ) {
            naoCumpridos++;
          }
        }
      );
    }
  );

  return {
    totalADMS,

    cumpridos,

    naoCumpridos,

    totalFaltas:
      faltas.length,

    desempenho:
      cumpridos >=
      naoCumpridos
        ? "bom desempenho operacional"
        : "necessidade de melhorias operacionais",
  };
}

/* =========================================================
   📄 PDF TEMPLATE
========================================================= */

function gerarRelatorioHTML() {
  const metricas =
    gerarMetricas();

  return `
    <div
      style="
        padding: 48px;
        font-family: Arial;
        color: #111;
      "
    >

      <h1
        style="
          font-size: 34px;
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
          ${metricas.cumpridos}
        </li>

        <li>
          Prazos não cumpridos:
          ${metricas.naoCumpridos}
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
        O comitê apresentou
        <strong>
          ${metricas.desempenho}
        </strong>.
      </p>

    </div>
  `;
}

/* =========================================================
   📄 PDF
========================================================= */

async function gerarPDF() {
  if (
    typeof html2pdf ===
    "undefined"
  ) {
    alert(
      "Biblioteca html2pdf não encontrada."
    );

    return;
  }

  const container =
    createElement("div");

  container.id =
    "pdf-temp";

  Object.assign(
    container.style,
    {
      background:
        "#ffffff",

      color: "#111111",

      width: "210mm",

      minHeight: "297mm",
    }
  );

  container.innerHTML =
    gerarRelatorioHTML();

  document.body.appendChild(
    container
  );

  try {
    await html2pdf()
      .set({
        margin:
          CONFIG.PDF.margin,

        filename:
          CONFIG.PDF
            .filename,

        image: {
          type: "jpeg",
          quality: 1,
        },

        html2canvas: {
          scale:
            CONFIG.PDF
              .scale,

          useCORS: true,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation:
            "portrait",
        },
      })
      .from(container)
      .save();
  } finally {
    container.remove();
  }
}

/* =========================================================
   🚀 EVENTS
========================================================= */

DOM.addADMButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      () => {
        const semanaId =
          button.dataset
            .addAdm;

        const container =
          document.querySelector(
            `[data-semana="${semanaId}"]`
          );

        if (!container)
          return;

        const totalCards =
          container.children
            .length;

        if (
          totalCards >=
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
    );
  }
);

DOM.addFalta?.addEventListener(
  "click",
  () => {
    DOM.faltas?.appendChild(
      createFaltaCard()
    );
  }
);

DOM.gerarPDF?.addEventListener(
  "click",
  async (event) => {
    event.preventDefault();

    const originalText =
      DOM.gerarPDF
        .innerHTML;

    try {
      DOM.gerarPDF.disabled =
        true;

      DOM.gerarPDF.innerHTML =
        "Gerando relatório...";

      await gerarPDF();
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao gerar relatório."
      );
    } finally {
      DOM.gerarPDF.disabled =
        false;

      DOM.gerarPDF.innerHTML =
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

DOM.faltas?.appendChild(
  createFaltaCard()
);

console.log(
  "%c🩸 Sistema Carmesim iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);
