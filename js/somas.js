const gerarWhatsappButton =
  document.querySelector("#gerar-whatsapp");

const faltasWrapper =
  document.querySelector("#faltas-wrapper");

const membrosContainer =
  document.querySelector("#membros-container");

const totalInputs =
  document.querySelectorAll("[data-total]");

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

function getValue(selector) {
  return document.querySelector(selector)?.value || "";
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
    const option =
      document.createElement("option");

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
  const wrapper =
    document.createElement("div");

  wrapper.appendChild(
    createLabel(label)
  );

  wrapper.appendChild(input);

  return wrapper;
}

/* =========================================================
   ⚠️ FALTAS
========================================================= */

function createFaltaCard() {
  const card =
    document.createElement("div");

  card.className =
    "metric-card animate-fade";

  const grid =
    document.createElement("div");

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
      placeholder:
        "Descrição da ocorrência",
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

  grid.append(
    membroField,
    ocorridoField,
    quantidadeField,
    advertenciaField
  );

  card.appendChild(grid);

  const removeButton =
    document.createElement("button");

  removeButton.type = "button";

  removeButton.className =
    "mt-6 w-full bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

  removeButton.textContent =
    "Remover falta";

  removeButton.addEventListener(
    "click",
    () => card.remove()
  );

  card.appendChild(removeButton);

  return card;
}

/* =========================================================
   👥 MEMBROS
========================================================= */

function createMembroCard() {
  const card =
    document.createElement("div");

  card.className =
    "metric-card animate-fade";

  const grid =
    document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const nomeField = createField({
    label: "Nome do membro",
    input: createInput({
      placeholder: "Ex: Letícia",
    }),
  });

  const quantidadeField =
    createField({
      label: "Quantidade calculada",
      input: createInput({
        type: "number",
        placeholder: "0",
      }),
    });

  grid.append(
    nomeField,
    quantidadeField
  );

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
    () => card.remove()
  );

  card.appendChild(removeButton);

  return card;
}

/* =========================================================
   📊 MÉTRICAS
========================================================= */

function atualizarMetricas() {
  const semanas = [
    {
      aleatorios: formatNumber(
        getValue("#s1-aleatorios")
      ),
      fixos: formatNumber(
        getValue("#s1-fixos")
      ),
      comuns: formatNumber(
        getValue("#s1-comuns")
      ),
    },
    {
      aleatorios: formatNumber(
        getValue("#s2-aleatorios")
      ),
      fixos: formatNumber(
        getValue("#s2-fixos")
      ),
      comuns: formatNumber(
        getValue("#s2-comuns")
      ),
    },
    {
      aleatorios: formatNumber(
        getValue("#s3-aleatorios")
      ),
      fixos: formatNumber(
        getValue("#s3-fixos")
      ),
      comuns: formatNumber(
        getValue("#s3-comuns")
      ),
    },
  ];

  metricas.totalAleatorios =
    semanas.reduce(
      (acc, s) =>
        acc + s.aleatorios,
      0
    );

  metricas.totalFixos =
    semanas.reduce(
      (acc, s) =>
        acc + s.fixos,
      0
    );

  metricas.totalComuns =
    semanas.reduce(
      (acc, s) =>
        acc + s.comuns,
      0
    );

  metricas.totalRelatorios =
    metricas.totalAleatorios +
    metricas.totalFixos +
    metricas.totalComuns;

  atualizarCards();
}

function atualizarCards() {
  const total =
    document.querySelector(
      "#metrica-total"
    );

  const adms =
    document.querySelector(
      "#metrica-adms"
    );

  const membros =
    document.querySelector(
      "#metrica-membros"
    );

  const produtividade =
    document.querySelector(
      "#metrica-produtividade"
    );

  if (total)
    total.textContent =
      metricas.totalRelatorios;

  if (adms)
    adms.textContent =
      metricas.totalAleatorios;

  if (membros)
    membros.textContent =
      metricas.totalComuns;

  if (produtividade) {
    produtividade.textContent =
      metricas.totalRelatorios > 0
        ? "100%"
        : "0%";
  }
}

/* =========================================================
   📥 COLETA DE DADOS
========================================================= */

function coletarDados() {
  const faltas = [];

  document
    .querySelectorAll(
      "#faltas-wrapper .metric-card"
    )
    .forEach((card) => {
      const inputs =
        card.querySelectorAll(
          "input, select"
        );

      if (inputs.length >= 4) {
        faltas.push({
          membro: inputs[0].value,
          ocorrido: inputs[1].value,
          quantidade:
            inputs[2].value,
          advertencia:
            inputs[3].value,
        });
      }
    });

  const membros = [];

  document
    .querySelectorAll(
      "#membros-container .metric-card"
    )
    .forEach((card) => {
      const inputs =
        card.querySelectorAll(
          "input"
        );

      if (inputs.length >= 2) {
        membros.push({
          nome: inputs[0].value,
          quantidade:
            inputs[1].value,
        });
      }
    });

  return {
    mes: getValue("#mes"),

    total: getValue(
      "#total-geral"
    ),

    observacoes: getValue(
      "#observacoes"
    ),

    topMembros: getValue(
      "#top-membros"
    ),

    topAdms: getValue(
      "#top-adms"
    ),

    destaques: getValue(
      "#destaques-comite"
    ),

    metricas,

    membros,

    faltas,
  };
}

async function gerarMensagemWhatsapp() {

  atualizarMetricas();

  const dados = coletarDados();

  let mensagem = "";

  mensagem += "🌫️💬 *Relatório mensal - Comitê de Somas*\n\n";

  mensagem += `♦️ *Mês:* ${dados.mes || "-"}\n\n`;

  mensagem += `♦️ *Quantidade de relatórios calculados no total no final do mês:*\n`;
  mensagem += `${dados.total || "0"}\n\n`;

  for (let i = 1; i <= 3; i++) {

    mensagem += `📇 *${i}° Semana:*\n\n`;

    mensagem += `*N° de relatórios sobre ADMs de estantes aleatórias calculados:* ${getValue(`#s${i}-aleatorios`) || 0}\n`;

    mensagem += `*N° de relatórios sobre ADMs FIXO calculados:* ${getValue(`#s${i}-fixos`) || 0}\n`;

    mensagem += `*N° de relatórios sobre membros comuns calculados:* ${getValue(`#s${i}-comuns`) || 0}\n\n`;

  }

  mensagem += "📇 *4° Semana:*\n";
  mensagem += "⚠️ Pausa ⚠️\n\n";

  mensagem += "♦️ *Quantidade de relatórios calculada por membro do comitê:*\n\n";

  if (dados.membros.length === 0) {

    mensagem += "Nenhum membro informado.\n\n";

  } else {

    dados.membros.forEach((membro) => {

      mensagem += `*${membro.nome || "-"}:* ${membro.quantidade || 0}\n`;

    });

    mensagem += "\n";

  }

  mensagem += "♦️ *Destaques do mês:*\n\n";

  mensagem += "*Top 3 membros com mais pontos:*\n";
  mensagem += `${dados.topMembros || "-"}\n\n`;

  mensagem += "*Top 3 ADMs com mais pontos:*\n";
  mensagem += `${dados.topAdms || "-"}\n\n`;

  mensagem += "*Membros destaque do comitê:*\n";
  mensagem += `${dados.destaques || "-"}\n\n`;

  mensagem += "♦️ *Faltas cometidas:*\n\n";

  if (dados.faltas.length === 0) {

    mensagem += "Nenhuma falta registrada.\n\n";

  } else {

    dados.faltas.forEach((falta) => {

      mensagem +=
`🔖 *Membro em questão:* ${falta.membro || "-"}

⁉️ *O que aconteceu?*
${falta.ocorrido || "-"}

⚠️ *N° de vezes em que aconteceu:*
${falta.quantidade || 0}

🛑 *Aplicou advertência?*
${falta.advertencia || "-"}

`;

    });

  }

  mensagem += "📝 *Observações finais:*\n";
  mensagem += `${dados.observacoes || "-"}\n`;

  try {

    await navigator.clipboard.writeText(mensagem);

    alert("Mensagem copiada para a área de transferência!");

  } catch (e) {

    console.error(e);

    alert("Erro ao gerar mensagem.");

  }

}

/* =========================================================
   🚀 EVENTS
========================================================= */

document
  .querySelector("#add-membro")
  ?.addEventListener("click", () => {
    membrosContainer?.appendChild(
      createMembroCard()
    );
  });

document
  .querySelector("#add-falta")
  ?.addEventListener("click", () => {
    faltasWrapper?.appendChild(
      createFaltaCard()
    );
  });

totalInputs.forEach((input) => {
  input.addEventListener(
    "input",
    atualizarMetricas
  );
});

gerarWhatsappButton?.addEventListener(
  "click",
  gerarMensagemWhatsapp
);

/* =========================================================
   ⚡ INIT
========================================================= */

atualizarMetricas();

console.log(
  "%c🧮 Comitê de Somas iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);
