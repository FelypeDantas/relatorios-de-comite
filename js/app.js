/* =========================================================
   🩸 SANGUE CARMESIM • APP
========================================================= */

const semanasContainer = document.querySelectorAll("[data-semana]");
const faltasContainer = document.querySelector("#faltas-container");

const gerarPDFButton = document.querySelector("#gerar-pdf");

/* =========================================================
   📦 CONFIG
========================================================= */

const MAX_ADMS = 20;

/* =========================================================
   🧠 HELPERS
========================================================= */

function createInput({
  type = "text",
  placeholder = "",
  className = "",
}) {
  const input = document.createElement("input");

  input.type = type;
  input.placeholder = placeholder;

  input.className =
    className ||
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white";

  return input;
}

function createSelect(options = []) {
  const select = document.createElement("select");

  select.className =
    "w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 text-white";

  options.forEach((optionText) => {
    const option = document.createElement("option");

    option.value = optionText;
    option.textContent = optionText;

    select.appendChild(option);
  });

  return select;
}

function createLabel(text) {
  const label = document.createElement("label");

  label.className = "block text-sm text-zinc-400 mb-2";
  label.textContent = text;

  return label;
}

function createField({ label, input }) {
  const wrapper = document.createElement("div");

  wrapper.appendChild(createLabel(label));
  wrapper.appendChild(input);

  return wrapper;
}

function createRemoveButton(onClick) {
  const button = document.createElement("button");

  button.type = "button";

  button.className =
    "mt-6 w-full bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

  button.textContent = "Remover";

  button.addEventListener("click", onClick);

  return button;
}

/* =========================================================
   👥 ADM CARD
========================================================= */

function createADMCard() {
  const card = document.createElement("div");

  card.className =
    "bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 animate-fade";

  const grid = document.createElement("div");

  grid.className = "grid grid-cols-1 lg:grid-cols-3 gap-6";

  const admField = createField({
    label: "ADM",
    input: createInput({
      placeholder: "Nome do ADM",
    }),
  });

  const contribuicaoField = createField({
    label: "Contribuição",
    input: createInput({
      placeholder: "Ex: 15 atendimentos",
    }),
  });

  const prazoField = createField({
    label: "Prazo cumprido?",
    input: createSelect(["Selecione", "Sim", "Não"]),
  });

  grid.appendChild(admField);
  grid.appendChild(contribuicaoField);
  grid.appendChild(prazoField);

  card.appendChild(grid);

  const removeButton = createRemoveButton(() => {
    card.remove();
  });

  card.appendChild(removeButton);

  return card;
}

/* =========================================================
   ⚠️ FALTA CARD
========================================================= */

function createFaltaCard() {
  const card = document.createElement("div");

  card.className =
    "bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6";

  const grid = document.createElement("div");

  grid.className = "grid grid-cols-1 lg:grid-cols-4 gap-6";

  const admField = createField({
    label: "ADM",
    input: createInput({
      placeholder: "Nome do ADM",
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
    label: "Advertência?",
    input: createSelect(["Selecione", "Sim", "Não"]),
  });

  grid.appendChild(admField);
  grid.appendChild(ocorridoField);
  grid.appendChild(quantidadeField);
  grid.appendChild(advertenciaField);

  card.appendChild(grid);

  const removeButton = createRemoveButton(() => {
    card.remove();
  });

  card.appendChild(removeButton);

  return card;
}

/* =========================================================
   📇 SEMANAS
========================================================= */

document.querySelectorAll("[data-add-adm]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.addAdm;

    const container = document.querySelector(
      `[data-semana="${target}"]`
    );

    if (!container) return;

    const currentCards =
      container.querySelectorAll(".bg-zinc-950\\/70").length;

    if (currentCards >= MAX_ADMS) {
      alert("Limite máximo de ADMs atingido.");
      return;
    }

    container.appendChild(createADMCard());
  });
});

/* =========================================================
   ⚠️ FALTAS
========================================================= */

const addFaltaButton = document.querySelector("#add-falta");

if (addFaltaButton) {
  addFaltaButton.addEventListener("click", () => {
    faltasContainer.appendChild(createFaltaCard());
  });
}

/* =========================================================
   📊 MÉTRICAS
========================================================= */

function coletarDados() {
  const semanas = [];

  document.querySelectorAll("[data-semana]").forEach((semana) => {
    const cards = semana.querySelectorAll(".bg-zinc-950\\/70");

    const contribuicoes = [];

    cards.forEach((card) => {
      const inputs = card.querySelectorAll("input, select");

      if (inputs.length < 3) return;

      contribuicoes.push({
        adm: inputs[0].value,
        contribuicao: inputs[1].value,
        prazo: inputs[2].value,
      });
    });

    semanas.push(contribuicoes);
  });

  const faltas = [];

  if (faltasContainer) {
    faltasContainer
      .querySelectorAll(".bg-zinc-950\\/70")
      .forEach((card) => {
        const inputs = card.querySelectorAll("input, select");

        faltas.push({
          adm: inputs[0].value,
          ocorrido: inputs[1].value,
          quantidade: inputs[2].value,
          advertencia: inputs[3].value,
        });
      });
  }

  return {
    semanas,
    faltas,
  };
}

function gerarMetricas() {
  const dados = coletarDados();

  let totalADMS = 0;
  let totalCumpridos = 0;
  let totalNaoCumpridos = 0;

  dados.semanas.forEach((semana) => {
    semana.forEach((adm) => {
      totalADMS++;

      if (adm.prazo === "Sim") {
        totalCumpridos++;
      }

      if (adm.prazo === "Não") {
        totalNaoCumpridos++;
      }
    });
  });

  return {
    totalADMS,
    totalCumpridos,
    totalNaoCumpridos,
    totalFaltas: dados.faltas.length,
  };
}

/* =========================================================
   📄 PDF
========================================================= */

function gerarRelatorioHTML() {
  const metricas = gerarMetricas();

  return `
    <div
      style="
        padding: 40px;
        font-family: Arial;
        color: #111;
      "
    >

      <h1
        style="
          font-size: 32px;
          margin-bottom: 10px;
        "
      >
        Relatório Mensal
      </h1>

      <p
        style="
          color: #555;
          margin-bottom: 30px;
        "
      >
        Comitê de Atendimento • Sangue Carmesim
      </p>

      <hr />

      <h2 style="margin-top: 30px;">
        Métricas gerais
      </h2>

      <ul>
        <li>Total de registros: ${metricas.totalADMS}</li>
        <li>Prazos cumpridos: ${metricas.totalCumpridos}</li>
        <li>Prazos não cumpridos: ${metricas.totalNaoCumpridos}</li>
        <li>Faltas registradas: ${metricas.totalFaltas}</li>
      </ul>

      <h2 style="margin-top: 30px;">
        Análise automática
      </h2>

      <p>
        O comitê apresentou
        ${
          metricas.totalCumpridos >= metricas.totalNaoCumpridos
            ? "bom desempenho operacional."
            : "necessidade de melhoria operacional."
        }
      </p>

    </div>
  `;
}

async function gerarPDF() {
  if (typeof html2pdf === "undefined") {
    alert("Biblioteca html2pdf não encontrada.");
    return;
  }

  const pdfContainer =
    document.createElement("div");

  pdfContainer.id = "pdf-temp";

  pdfContainer.style.background =
    "#ffffff";

  pdfContainer.style.color =
    "#111111";

  pdfContainer.style.padding =
    "40px";

  pdfContainer.style.width =
    "210mm";

  pdfContainer.innerHTML =
    gerarRelatorioHTML();

  document.body.appendChild(
    pdfContainer
  );

  const options = {
    margin: 0.3,

    filename:
      "relatorio-atendimento.pdf",

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
      useCORS: true,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation:
        "portrait",
    },
  };

  try {
    await html2pdf()
      .set(options)
      .from(pdfContainer)
      .save();
  } finally {
    pdfContainer.remove();
  }
}
/* =========================================================
   🚀 INIT
========================================================= */

if (gerarPDFButton) {
  gerarPDFButton.addEventListener("click", async (event) => {
    event.preventDefault();

    gerarPDFButton.disabled = true;

    gerarPDFButton.innerHTML =
      "Gerando relatório...";

    try {
      await gerarPDF();
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
  });
}

console.log(
  "%c🩸 Sistema Carmesim iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);
