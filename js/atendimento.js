/* =========================================================
   🩸 SANGUE CARMESIM • ATENDIMENTO
========================================================= */

import { gerarPDF } from "./pdf/pdf-atendimento.js";

/* =========================================================
   ⚙️ HELPERS
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];

function createElement(
  tag,
  className = ""
) {
  const element =
    document.createElement(tag);

  element.className = className;

  return element;
}

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

  main:
    document.querySelector("main"),
};

/* =========================================================
   🎨 CLASSES
========================================================= */

const CLASSES = {
  input:
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white",

  card:
    "adm-card bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 space-y-6 animate-fade",

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

  wrapper.append(
    label,
    input
  );

  return wrapper;
}

function createRemoveButton(
  target
) {
  const button =
    createElement(
      "button",
      CLASSES.removeButton
    );

  button.type = "button";

  button.innerHTML =
    "🗑️ Remover";

  button.addEventListener(
    "click",
    () => target.remove()
  );

  return button;
}

function createCard({
  columns,
  fields,
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
          field:
            "quantidade",

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
   📄 PDF
========================================================= */

async function handleGerarPDF() {
  const button =
    DOM.gerarPDFButton;

  const originalText =
    button.innerHTML;

  try {
    button.disabled = true;

    button.innerHTML =
      "📄 Gerando PDF...";

    await gerarPDF({
        filename:
          CONFIG.PDF_FILENAME,
      });
  } catch (error) {
    console.error(error);

    alert(
      "Erro ao gerar PDF."
    );
  } finally {
    button.disabled = false;

    button.innerHTML =
      originalText;
  }
}

/* =========================================================
   🚀 EVENTOS
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
      "Limite máximo de ADMs atingido."
    );

    return;
  }

  container.appendChild(
    createADMCard()
  );
}

function registrarEventos() {
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
}

/* =========================================================
   ⚡ INIT
========================================================= */

function init() {
  DOM.semanas.forEach(
    (semana) =>
      semana.appendChild(
        createADMCard()
      )
  );

  DOM.faltasContainer?.appendChild(
    createFaltaCard()
  );

  registrarEventos();

  console.log(
    "%c🩸 Sistema Carmesim iniciado.",
    "color: crimson;font-size:14px;font-weight:bold;"
  );
}

init();
