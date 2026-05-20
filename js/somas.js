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

/* =========================================================
   📥 COLETA
========================================================= */

function coletarDados() {
  const faltas = [];

  document
    .querySelectorAll(".metric-card")
    .forEach((card) => {
      const inputs =
        card.querySelectorAll("input, select");

      if (inputs.length === 4) {
        faltas.push({
          membro: inputs[0].value,
          ocorrido: inputs[1].value,
          quantidade: inputs[2].value,
          advertencia: inputs[3].value,
        });
      }
    });

  return {
    mes:
      document.querySelector("#mes")?.value || "",

    total:
      document.querySelector("#total-geral")
        ?.value || 0,

    observacoes:
      document.querySelector("#observacoes")
        ?.value || "",

    metricas,

    faltas,
  };
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

/* =========================================================
   📄 PDF
========================================================= */

function gerarRelatorioHTML() {
  const dados = coletarDados();

  return `
    <div
      style="
        padding: 50px;
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
          color: #555;
          margin-bottom: 30px;
        "
      >
        Comitê de Somas • Sangue Carmesim
      </p>

      <hr />

      <h2 style="margin-top: 30px;">
        Dados gerais
      </h2>

      <ul>
        <li>
          <strong>Mês:</strong>
          ${dados.mes}
        </li>

        <li>
          <strong>Total geral:</strong>
          ${dados.total}
        </li>
      </ul>

      <h2 style="margin-top: 30px;">
        Métricas
      </h2>

      <ul>
        <li>
          Relatórios aleatórios:
          ${dados.metricas.totalAleatorios}
        </li>

        <li>
          Relatórios FIXO:
          ${dados.metricas.totalFixos}
        </li>

        <li>
          Relatórios comuns:
          ${dados.metricas.totalComuns}
        </li>

        <li>
          Total processado:
          ${dados.metricas.totalRelatorios}
        </li>
      </ul>

      <h2 style="margin-top: 30px;">
        Faltas registradas
      </h2>

      ${
        dados.faltas.length === 0
          ? "<p>Nenhuma falta registrada.</p>"
          : dados.faltas
              .map(
                (falta) => `
            <div
              style="
                margin-bottom: 20px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 12px;
              "
            >
              <p>
                <strong>Membro:</strong>
                ${falta.membro}
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
              .join("")
      }

      <h2 style="margin-top: 30px;">
        Observações finais
      </h2>

      <p>
        ${
          dados.observacoes ||
          "Nenhuma observação registrada."
        }
      </p>

    </div>
  `;
}

async function gerarPDF() {
  if (typeof html2pdf === "undefined") {
    alert(
      "Biblioteca html2pdf não encontrada."
    );

    return;
  }

  const container = document.createElement("div");

  container.innerHTML = gerarRelatorioHTML();

  const options = {
    margin: 0.5,

    filename:
      "relatorio-comite-somas.pdf",

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
    },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  await html2pdf()
    .set(options)
    .from(container)
    .save();
}

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

gerarPDFButton?.addEventListener(
  "click",
  async () => {
    try {
      gerarPDFButton.disabled = true;

      gerarPDFButton.innerHTML =
        "Gerando PDF...";

      atualizarMetricas();

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
  }
);

/* =========================================================
   ⚡ INIT
========================================================= */

atualizarMetricas();

console.log(
  "%c🧮 Comitê de Somas iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);