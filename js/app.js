/* =========================================================
   🩸 SANGUE CARMESIM • ATENDIMENTO
========================================================= */

import { gerarPDF } from "./pdf.js";

/* =========================================================
   ⚙️ HELPERS
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];

const createElement = (
  tag,
  className = ""
) => {
  const element =
    document.createElement(tag);

  element.className = className;

  return element;
};

/* =========================================================
   ⚙️ CONFIG
========================================================= */

const CONFIG = {
  MAX_ADMS: 20,

  PDF_FILENAME:
    "relatorio-atendimento.pdf",
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

  removeButton:
    "w-full py-3 rounded-2xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-300 transition-all",
};

/* =========================================================
   🧱 FACTORIES
========================================================= */

function createInput({
  type = "text",
  placeholder = "",
  field,
}) {
  const input = createElement(
    "input",
    CLASSES.input
  );

  input.type = type;
  input.placeholder =
    placeholder;

  input.dataset.field = field;

  return input;
}

function createSelect({
  options = [],
  field,
}) {
  const select =
    createElement(
      "select",
      CLASSES.input
    );

  select.dataset.field = field;

  select.innerHTML = options
    .map(
      (option) =>
        `<option value="${option}">${option}</option>`
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

  wrapper.append(label, input);

  return wrapper;
}

function createRemoveButton(
  element
) {
  const button =
    createElement(
      "button",
      CLASSES.removeButton
    );

  button.type = "button";

  button.textContent =
    "Remover";

  button.addEventListener(
    "click",
    () => element.remove()
  );

  return button;
}

function createCard({
  columns = 3,
  fields = [],
}) {
  const card =
    createElement(
      "div",
      CLASSES.card
    );

  const grid =
    createElement(
      "div",
      `grid grid-cols-1 lg:grid-cols-${columns} gap-6`
    );

  grid.append(...fields);

  card.append(
    grid,
    createRemoveButton(card)
  );

  return card;
}

/* =========================================================
   👥 ADM CARD
========================================================= */

function createADMCard() {
  return createCard({
    columns: 3,

    fields: [
      createField(
        "ADM",

        createInput({
          field: "adm",

          placeholder:
            "Nome do ADM",
        })
      ),

      createField(
        "Contribuição",

        createInput({
          field:
            "contribuicao",

          placeholder:
            "Ex: 15 atendimentos",
        })
      ),

      createField(
        "Prazo cumprido?",

        createSelect({
          field: "prazo",

          options: [
            "Selecione",
            "Sim",
            "Não",
          ],
        })
      ),
    ],
  });
}

/* =========================================================
   ⚠️ FALTA CARD
========================================================= */

function createFaltaCard() {
  return createCard({
    columns: 4,

    fields: [
      createField(
        "ADM",

        createInput({
          field: "adm",

          placeholder:
            "Nome do ADM",
        })
      ),

      createField(
        "Ocorrido",

        createInput({
          field: "ocorrido",

          placeholder:
            "Descrição",
        })
      ),

      createField(
        "Quantidade",

        createInput({
          field: "quantidade",

          type: "number",

          placeholder: "0",
        })
      ),

      createField(
        "Advertência?",

        createSelect({
          field:
            "advertencia",

          options: [
            "Selecione",
            "Sim",
            "Não",
          ],
        })
      ),
    ],
  });
}

/* =========================================================
   📊 DATA
========================================================= */

function getField(
  card,
  field
) {
  return (
    card.querySelector(
      `[data-field="${field}"]`
    )?.value || "-"
  );
}

function coletarSemanas() {
  return DOM.semanas.map(
    (semana) =>
      [
        ...semana.querySelectorAll(
          ".adm-card"
        ),
      ].map((card) => ({
        adm: getField(
          card,
          "adm"
        ),

        contribuicao:
          getField(
            card,
            "contribuicao"
          ),

        prazo: getField(
          card,
          "prazo"
        ),
      }))
  );
}

function coletarFaltas() {
  return [
    ...DOM.faltasContainer.querySelectorAll(
      ".adm-card"
    ),
  ].map((card) => ({
    adm: getField(
      card,
      "adm"
    ),

    ocorrido: getField(
      card,
      "ocorrido"
    ),

    quantidade:
      getField(
        card,
        "quantidade"
      ),

    advertencia:
      getField(
        card,
        "advertencia"
      ),
  }));
}

/* =========================================================
   📄 PDF
========================================================= */

async function handleGerarPDF() {
  const dados = {
    mes: DOM.mes.value,

    ano: DOM.ano.value,

    meta: DOM.meta.value,

    observacoes:
      DOM.observacoes.value,

    semanas: coletarSemanas(),

    faltas: coletarFaltas(),
  };

  const button =
    DOM.gerarPDFButton;

  const originalText =
    button.innerHTML;

  try {
    button.disabled = true;

    button.innerHTML =
      "Gerando PDF...";

    await gerarPDF({
      filename:
        CONFIG.PDF_FILENAME,

      dados,
    });
  } finally {
    button.disabled = false;

    button.innerHTML =
      originalText;
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
  handleGerarPDF
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
  "color: crimson; font-size:14px; font-weight:bold;"
);
