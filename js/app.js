/* =========================================================
   🩸 SANGUE CARMESIM • ATENDIMENTO
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];

/* =========================================================
   ⚙️ CONFIG
========================================================= */

const CONFIG = {
  MAX_ADMS: 20,

  PDF: {
    filename:
      "relatorio-atendimento.pdf",
  },
};

/* =========================================================
   📦 DOM
========================================================= */

const DOM = {
  semanas: $$("[data-semana]"),

  addADMButtons:
    $$("[data-add-adm]"),

  faltasContainer:
    $("#faltas-container"),

  addFaltaButton:
    $("#add-falta"),

  gerarPDFButton:
    $("#gerar-pdf"),

  mes: $("#mes"),

  ano: $("#ano"),

  meta: $("#meta"),

  observacoes:
    $("#observacoes"),
};

/* =========================================================
   🎨 CLASSES
========================================================= */

const CLASSES = {
  input:
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white",

  card:
    "adm-card bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 space-y-6",

  buttonRemove:
    "w-full py-3 rounded-2xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-300 transition-all",
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

  element.className =
    className;

  return element;
}

function createInput({
  type = "text",
  placeholder = "",
} = {}) {
  const input =
    createElement(
      "input",
      CLASSES.input
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
      CLASSES.input
    );

  select.innerHTML =
    options
      .map(
        (option) =>
          `<option>${option}</option>`
      )
      .join("");

  return select;
}

function createField(
  labelText,
  input
) {
  const wrapper =
    createElement("div");

  const label =
    createElement(
      "label",
      "block text-sm text-zinc-400 mb-2"
    );

  label.textContent =
    labelText;

  wrapper.append(
    label,
    input
  );

  return wrapper;
}

function createRemoveButton(
  callback
) {
  const button =
    createElement(
      "button",
      CLASSES.buttonRemove
    );

  button.type = "button";

  button.textContent =
    "Remover";

  button.onclick =
    callback;

  return button;
}

/* =========================================================
   👥 CARD ADM
========================================================= */

function createADMCard() {
  const card =
    createElement(
      "div",
      CLASSES.card
    );

  const grid =
    createElement(
      "div",
      "grid grid-cols-1 lg:grid-cols-3 gap-6"
    );

  const fields = [
    createField(
      "ADM",
      createInput({
        placeholder:
          "Nome do ADM",
      })
    ),

    createField(
      "Contribuição",
      createInput({
        placeholder:
          "Ex: 15 atendimentos",
      })
    ),

    createField(
      "Prazo cumprido?",
      createSelect([
        "Selecione",
        "Sim",
        "Não",
      ])
    ),
  ];

  grid.append(...fields);

  card.append(
    grid,
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
      CLASSES.card
    );

  const grid =
    createElement(
      "div",
      "grid grid-cols-1 lg:grid-cols-4 gap-6"
    );

  const fields = [
    createField(
      "ADM",
      createInput({
        placeholder:
          "Nome do ADM",
      })
    ),

    createField(
      "Ocorrido",
      createInput({
        placeholder:
          "Descrição",
      })
    ),

    createField(
      "Quantidade",
      createInput({
        type: "number",
        placeholder: "0",
      })
    ),

    createField(
      "Advertência?",
      createSelect([
        "Selecione",
        "Sim",
        "Não",
      ])
    ),
  ];

  grid.append(...fields);

  card.append(
    grid,
    createRemoveButton(() =>
      card.remove()
    )
  );

  return card;
}

/* =========================================================
   📊 COLETA DE DADOS
========================================================= */

function coletarSemanas() {
  return DOM.semanas.map(
    (semana) => {
      return [
        ...semana.querySelectorAll(
          ".adm-card"
        ),
      ].map((card) => {
        const [
          adm,
          contribuicao,
          prazo,
        ] =
          card.querySelectorAll(
            "input, select"
          );

        return {
          adm:
            adm.value || "-",

          contribuicao:
            contribuicao.value ||
            "-",

          prazo:
            prazo.value || "-",
        };
      });
    }
  );
}

function coletarFaltas() {
  return [
    ...DOM.faltasContainer.querySelectorAll(
      ".adm-card"
    ),
  ].map((card) => {
    const [
      adm,
      ocorrido,
      quantidade,
      advertencia,
    ] =
      card.querySelectorAll(
        "input, select"
      );

    return {
      adm:
        adm.value || "-",

      ocorrido:
        ocorrido.value ||
        "-",

      quantidade:
        quantidade.value ||
        "-",

      advertencia:
        advertencia.value ||
        "-",
    };
  });
}

/* =========================================================
   📄 HTML PDF
========================================================= */

function gerarRelatorioHTML() {
  const semanas =
    coletarSemanas();

  const faltas =
    coletarFaltas();

  return `
    <div style="font-family: Arial; color: #111;">

      <h1>
        🩸 Relatório Mensal
      </h1>

      <p>
        Comitê de Atendimento
      </p>

      <hr />

      <h2>
        Informações Gerais
      </h2>

      <p>
        <strong>Mês:</strong>
        ${DOM.mes.value || "-"}
      </p>

      <p>
        <strong>Ano:</strong>
        ${DOM.ano.value || "-"}
      </p>

      <p>
        <strong>Meta:</strong>
        ${DOM.meta.value || "-"}
      </p>

      ${semanas
        .map(
          (
            semana,
            index
          ) => `
            <div style="margin-top:30px;">

              <h2>
                ${index + 1}ª Semana
              </h2>

              ${semana
                .map(
                  (
                    registro
                  ) => `
                    <div
                      style="
                        border:1px solid #ccc;
                        padding:12px;
                        margin-top:10px;
                        border-radius:10px;
                      "
                    >
                      <p>
                        <strong>ADM:</strong>
                        ${registro.adm}
                      </p>

                      <p>
                        <strong>Contribuição:</strong>
                        ${registro.contribuicao}
                      </p>

                      <p>
                        <strong>Prazo:</strong>
                        ${registro.prazo}
                      </p>
                    </div>
                  `
                )
                .join("")}

            </div>
          `
        )
        .join("")}

      <div style="margin-top:30px;">

        <h2>
          ⚠️ Faltas
        </h2>

        ${faltas
          .map(
            (
              falta
            ) => `
              <div
                style="
                  border:1px solid #ccc;
                  padding:12px;
                  margin-top:10px;
                  border-radius:10px;
                "
              >
                <p>
                  <strong>ADM:</strong>
                  ${falta.adm}
                </p>

                <p>
                  <strong>Ocorrido:</strong>
                  ${falta.ocorrido}
                </p>

                <p>
                  <strong>Quantidade:</strong>
                  ${falta.quantidade}
                </p>

                <p>
                  <strong>Advertência:</strong>
                  ${falta.advertencia}
                </p>
              </div>
            `
          )
          .join("")}

      </div>

      <div style="margin-top:30px;">

        <h2>
          📝 Observações
        </h2>

        <p>
          ${
            DOM.observacoes
              .value ||
            "Nenhuma observação."
          }
        </p>

      </div>

    </div>
  `;
}

/* =========================================================
   📄 PDF
========================================================= */

async function gerarPDF() {
  if (
    typeof window.html2pdf ===
    "undefined"
  ) {
    alert(
      "html2pdf não encontrado."
    );

    return;
  }

  const container =
    document.createElement("div");

  container.style.background =
    "#fff";

  container.style.padding =
    "40px";

  container.style.width =
    "794px";

  container.innerHTML =
    gerarRelatorioHTML();

  document.body.appendChild(
    container
  );

  try {
    await html2pdf()
      .from(container)
      .set({
        margin: 10,

        filename:
          CONFIG.PDF
            .filename,

        html2canvas: {
          scale: 2,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation:
            "portrait",
        },
      })
      .save();
  } catch (error) {
    console.error(error);

    alert(
      "Erro ao gerar PDF."
    );
  } finally {
    container.remove();
  }
}

/* =========================================================
   🚀 EVENTS
========================================================= */

function adicionarADM(
  semanaId
) {
  const container = $(
    `[data-semana="${semanaId}"]`
  );

  if (
    container.children
      .length >=
    CONFIG.MAX_ADMS
  ) {
    alert(
      "Limite máximo atingido."
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
      () =>
        adicionarADM(
          button.dataset
            .addAdm
        )
    );
  }
);

DOM.addFaltaButton?.addEventListener(
  "click",
  () => {
    DOM.faltasContainer.appendChild(
      createFaltaCard()
    );
  }
);

DOM.gerarPDFButton?.addEventListener(
  "click",
  async () => {
    const originalText =
      DOM.gerarPDFButton
        .innerHTML;

    DOM.gerarPDFButton.disabled =
      true;

    DOM.gerarPDFButton.innerHTML =
      "Gerando PDF...";

    await gerarPDF();

    DOM.gerarPDFButton.disabled =
      false;

    DOM.gerarPDFButton.innerHTML =
      originalText;
  }
);

/* =========================================================
   ⚡ INIT
========================================================= */

DOM.semanas.forEach(
  (semana) =>
    semana.appendChild(
      createADMCard()
    )
);

DOM.faltasContainer?.appendChild(
  createFaltaCard()
);

console.log(
  "%c🩸 Sistema Carmesim iniciado.",
  "color: crimson; font-size:14px; font-weight:bold;"
);
