import { gerarPDF } from "./pdf/pdf-somas.js";

/* =========================================================
   🧮 SANGUE CARMESIM • COMITÊ DE SOMAS
========================================================= */

const gerarPDFButton = document.querySelector("#gerar-pdf");

const faltasWrapper = document.querySelector("#faltas-wrapper");

const totalInputs = document.querySelectorAll("[data-total]");

const membrosContainer =
  document.querySelector(
    "#membros-container"
  );

document
  .querySelector("#add-membro")
  ?.addEventListener("click", () => {
    membrosContainer?.appendChild(
      createMembroCard()
    );
  });

const metricas = {
  totalRelatorios: 0,
  totalAleatorios: 0,
  totalFixos: 0,
  totalComuns: 0,
};

/* =========================================================
   🧠 HELPERS
========================================================= */

function formatNumber(value) {
  return Number(value || 0);
}

function createInput({
  type = "text",
  placeholder = "",
}) {
  const input = document.createElement("input");

  input.type = type;
  input.placeholder = placeholder;

  input.className = "input";

  return input;
}

function createSelect(options = []) {
  const select = document.createElement("select");

  select.className = "select";

  options.forEach((item) => {
    const option = document.createElement("option");

    option.value = item;
    option.textContent = item;

    select.appendChild(option);
  });

  return select;
}

function createLabel(text) {
  const label = document.createElement("label");

  label.className = "input-label";
  label.textContent = text;

  return label;
}

function createField({ label, input }) {
  const wrapper = document.createElement("div");

  wrapper.appendChild(createLabel(label));
  wrapper.appendChild(input);

  return wrapper;
}

/* =========================================================
   ⚠️ FALTA CARD
========================================================= */

function createFaltaCard() {
  const card = document.createElement("div");

  card.className = "metric-card animate-fade";

  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-4 gap-6";

  const membroField = createField({
    label: "Membro em questão",
    input: createInput({
      placeholder: "Nome do membro",
    }),
  });

  const ocorridoField = createField({
    label: "O que aconteceu?",
    input: createInput({
      placeholder: "Descrição da ocorrência",
    }),
  });

  const quantidadeField = createField({
    label: "Quantidade",
    input: createInput({
      type: "number",
      placeholder: "0",
    }),
  });

  const advertenciaField = createField({
    label: "Aplicou advertência?",
    input: createSelect([
      "Selecione",
      "Sim",
      "Não",
    ]),
  });

  grid.appendChild(membroField);
  grid.appendChild(ocorridoField);
  grid.appendChild(quantidadeField);
  grid.appendChild(advertenciaField);

  card.appendChild(grid);

  const removeButton = document.createElement("button");

  removeButton.type = "button";

  removeButton.className =
    "mt-6 w-full bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

  removeButton.textContent = "Remover falta";

  removeButton.addEventListener("click", () => {
    card.remove();

    atualizarMetricas();
  });

  card.appendChild(removeButton);

  return card;
}

/* =========================================================
   📊 MÉTRICAS
========================================================= */

function atualizarMetricas() {
  const semana1 = {
    aleatorios: formatNumber(
      document.querySelector("#s1-aleatorios")?.value
    ),
    fixos: formatNumber(
      document.querySelector("#s1-fixos")?.value
    ),
    comuns: formatNumber(
      document.querySelector("#s1-comuns")?.value
    ),
  };

  const semana2 = {
    aleatorios: formatNumber(
      document.querySelector("#s2-aleatorios")?.value
    ),
    fixos: formatNumber(
      document.querySelector("#s2-fixos")?.value
    ),
    comuns: formatNumber(
      document.querySelector("#s2-comuns")?.value
    ),
  };

  const semana3 = {
    aleatorios: formatNumber(
      document.querySelector("#s3-aleatorios")?.value
    ),
    fixos: formatNumber(
      document.querySelector("#s3-fixos")?.value
    ),
    comuns: formatNumber(
      document.querySelector("#s3-comuns")?.value
    ),
  };

  metricas.totalAleatorios =
    semana1.aleatorios +
    semana2.aleatorios +
    semana3.aleatorios;

  metricas.totalFixos =
    semana1.fixos +
    semana2.fixos +
    semana3.fixos;

  metricas.totalComuns =
    semana1.comuns +
    semana2.comuns +
    semana3.comuns;

  metricas.totalRelatorios =
    metricas.totalAleatorios +
    metricas.totalFixos +
    metricas.totalComuns;

  atualizarCards();
}

function atualizarCards() {
  const totalRelatoriosCard =
    document.querySelector("#metrica-total");

  const totalAleatoriosCard =
    document.querySelector("#metrica-aleatorios");

  const totalFixosCard =
    document.querySelector("#metrica-fixos");

  const totalComunsCard =
    document.querySelector("#metrica-comuns");

  if (totalRelatoriosCard) {
    totalRelatoriosCard.textContent =
      metricas.totalRelatorios;
  }

  if (totalAleatoriosCard) {
    totalAleatoriosCard.textContent =
      metricas.totalAleatorios;
  }

  if (totalFixosCard) {
    totalFixosCard.textContent =
      metricas.totalFixos;
  }

  if (totalComunsCard) {
    totalComunsCard.textContent =
      metricas.totalComuns;
  }
}


function createMembroCard() {
  const card = document.createElement("div");

  card.className =
    "metric-card animate-fade";

  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const nomeField = createField({
    label: "Nome do membro",
    input: createInput({
      placeholder: "Ex: Letícia",
    }),
  });

  const quantidadeField = createField({
    label: "Quantidade calculada",
    input: createInput({
      type: "number",
      placeholder: "0",
    }),
  });

  grid.appendChild(nomeField);
  grid.appendChild(quantidadeField);

  card.appendChild(grid);

  const removeButton =
    document.createElement("button");

  removeButton.type = "button";

  removeButton.className =
    "mt-6 w-full bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

  removeButton.textContent =
    "Remover membro";

  removeButton.addEventListener(
    "click",
    () => {
      card.remove();
    }
  );

  card.appendChild(removeButton);

  return card;
}

gerarPDFButton?.addEventListener(
  "click",
  async () => {
    try {
      gerarPDFButton.disabled = true;

      gerarPDFButton.innerHTML =
        "📄 Gerando PDF...";

      await gerarPDF({
        filename:
          "relatorio-comite-somas.pdf",
      });
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao gerar relatório."
      );
    } finally {
      gerarPDFButton.disabled = false;

      gerarPDFButton.innerHTML =
        "📄 Gerar relatório PDF";
    }
  }
);

/* =========================================================
   🚀 EVENTS
========================================================= */

document
  .querySelector("#add-falta")
  ?.addEventListener("click", () => {
    faltasWrapper?.appendChild(
      createFaltaCard()
    );
  });

document
  .querySelectorAll("[data-total]")
  .forEach((input) => {
    input.addEventListener(
      "input",
      atualizarMetricas
    );
  });

/* =========================================================
   ⚡ INIT
========================================================= */

atualizarMetricas();

console.log(
  "%c🧮 Comitê de Somas iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);
