document
  .getElementById("gerar-whatsapp")
  .addEventListener("click", gerarMensagemWhatsapp);

const faltasContainer =
  document.querySelector("#faltas-container");

const semanas =
  document.querySelectorAll("[data-semana]");

const addAdmButtons =
  document.querySelectorAll("[data-add-adm]");

/* =========================================================
   🧠 HELPERS
========================================================= */

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

  const card = document.createElement("div");

  card.className =
    "falta-card metric-card animate-fade";

  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-4 gap-6";

  // ADM
  const admInput = createInput({
    placeholder: "Nome do ADM",
  });

  admInput.classList.add("falta-adm");

  const admField = createField({
    label: "ADM",
    input: admInput,
  });

  // O que aconteceu
  const motivoInput = createInput({
    placeholder: "Descreva o ocorrido",
  });

  motivoInput.classList.add("falta-motivo");

  const motivoField = createField({
    label: "O que aconteceu?",
    input: motivoInput,
  });

  // Quantidade
  const quantidadeInput = createInput({
    type: "number",
    placeholder: "0",
  });

  quantidadeInput.classList.add("falta-vezes");

  const quantidadeField = createField({
    label: "N° de vezes",
    input: quantidadeInput,
  });

  // Advertência
  const advertenciaSelect = createSelect([
    "Selecione",
    "Sim",
    "Não",
  ]);

  advertenciaSelect.classList.add("falta-advertencia");

  const advertenciaField = createField({
    label: "Aplicou advertência?",
    input: advertenciaSelect,
  });

  grid.append(
    admField,
    motivoField,
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
   👥 ADMS
========================================================= */

function createAdmCard() {

    const card = document.createElement("div");

    card.className =
        "adm-card metric-card animate-fade";

    const grid = document.createElement("div");

    grid.className =
        "grid grid-cols-1 lg:grid-cols-3 gap-6";

    const admField = createField({
        label: "ADM",
        input: createInput({
            placeholder: "Nome do ADM"
        })
    });

    admField.querySelector("input")
        .classList.add("adm-nome");

    const contribuicaoField = createField({
        label: "Contribuição",
        input: createInput({
            placeholder: "Descreva a contribuição"
        })
    });

    contribuicaoField.querySelector("input")
        .classList.add("adm-contribuicao");

    const prazoField = createField({
        label: "Prazo cumprido?",
        input: createSelect([
            "Selecione",
            "Sim",
            "Não"
        ])
    });

    prazoField.querySelector("select")
        .classList.add("adm-prazo");

    grid.append(
        admField,
        contribuicaoField,
        prazoField
    );

    card.appendChild(grid);

    const removeButton =
        document.createElement("button");

    removeButton.type = "button";

    removeButton.className =
        "mt-6 w-full bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

    removeButton.textContent =
        "Remover ADM";

    removeButton.onclick = () => card.remove();

    card.appendChild(removeButton);

    return card;

}


/* =========================================================
   📥 COLETA DE DADOS
========================================================= */

function coletarDados() {

  const semanas = [];

  for (let numero = 1; numero <= 4; numero++) {

    const adms = [];

    document
      .querySelectorAll(
        `[data-semana="${numero}"] .adm-card`
      )
      .forEach((card) => {

        adms.push({
          adm: card.querySelector(".adm-nome")?.value || "",
          contribuicao: card.querySelector(".adm-contribuicao")?.value || "",
          prazo: card.querySelector(".adm-prazo")?.value || "",
        });

      });

    semanas.push({
      numero,
      adms,
    });

  }

  const faltas = [];

  document
    .querySelectorAll(".falta-card")
    .forEach((card) => {

      faltas.push({
        adm: card.querySelector(".falta-adm")?.value || "",
        motivo: card.querySelector(".falta-motivo")?.value || "",
        vezes: card.querySelector(".falta-vezes")?.value || "",
        advertencia: card.querySelector(".falta-advertencia")?.value || "",
      });

    });

  return {

    mes: getValue("#mes"),
    ano: getValue("#ano"),
    meta: getValue("#meta"),

    observacoes: getValue("#observacoes"),

    semanas,

    faltas,

  };

}

/* =========================================================
   🚀 EVENTS
========================================================= */

/* =========================================================
   🚀 EVENTS
========================================================= */

// Adicionar ADM na semana correspondente
addAdmButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const semana = button.dataset.addAdm;

    document
      .querySelector(`[data-semana="${semana}"]`)
      ?.appendChild(createAdmCard());

  });

});

// Adicionar falta
document
  .querySelector("#add-falta")
  ?.addEventListener("click", () => {

    faltasContainer?.appendChild(
      createFaltaCard()
    );

  });

/* =========================================================
   ⚡ INIT
========================================================= */

// Já inicia com um ADM em cada semana
for (let semana = 1; semana <= 4; semana++) {

  document
    .querySelector(`[data-semana="${semana}"]`)
    ?.appendChild(createAdmCard());

}

console.log(
  "%c💬 Comitê de Atendimento iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);


async function gerarMensagemWhatsapp() {

  const meta = document.getElementById("meta")?.value.trim() || "-";
  const observacoes = document.getElementById("observacoes")?.value.trim() || "-";

  let mensagem = `🌫️💬 *Relatório mensal – Comitê de Atendimento*

♦️ *Meta de atendimento*:
${meta}

`;

  // SEMANAS
  for (let semana = 1; semana <= 4; semana++) {

    mensagem += `📇 *${semana}° Semana*:\n\n`;

    const cards = document.querySelectorAll(
      `[data-semana="${semana}"] > *`
    );

    if (cards.length === 0) {

      mensagem += "_Nenhum ADM registrado._\n\n";
      continue;

    }

    cards.forEach((card) => {

      const inputs = card.querySelectorAll("input, textarea, select");

      const adm = inputs[0]?.value.trim() || "-";
      const contribuicao = inputs[1]?.value.trim() || "-";
      const prazo = inputs[2]?.value.trim() || "-";

      mensagem +=
          `*Adm*: ${adm}
          Contribuição: ${contribuicao}
          Prazo Cumprido?: ${prazo}
          
          `;
    });

  }

  mensagem += "♦️ *Faltas Cometidas:*\n\n";

  const faltas = document.querySelectorAll("#faltas-container > *");

  if (faltas.length === 0) {

    mensagem += "Nenhuma.\n\n";

  } else {

    faltas.forEach((falta) => {

      const inputs = falta.querySelectorAll("input, textarea, select");

      const adm = inputs[0]?.value.trim() || "-";
      const motivo = inputs[1]?.value.trim() || "-";
      const vezes = inputs[2]?.value.trim() || "-";
      const advertencia = inputs[3]?.value.trim() || "-";

      mensagem +=
          `🔖 *ADM*: ${adm}
          ⁉️ *O que aconteceu?*
          ${motivo}
          ⚠️ *N° de vezes em que aconteceu*:
          ${vezes}
          🛑 *Aplicou advertência*?:
          ${advertencia}
          
          `;

    });

  }

  mensagem += `*Obs*:
${observacoes}`;

  try {

    await navigator.clipboard.writeText(mensagem);

    alert("Mensagem copiada para a área de transferência!");

  } catch (e) {

    console.error(e);

  }

  window.open(
    `https://wa.me/?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );

}

