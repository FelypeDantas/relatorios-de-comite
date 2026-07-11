const eventosContainer =
  document.querySelector("#eventos-container");

const faltasContainer =
  document.querySelector("#faltas-container");

const gerarWhatsappButton =
  document.querySelector("#gerar-whatsapp");

/* =========================================================
   📊 MÉTRICAS
========================================================= */

const metricas = {
  eventos: 0,
  participantes: 0,
  faltas: 0,
};

/* =========================================================
   🧠 HELPERS
========================================================= */

function createInput({
  type = "text",
  placeholder = "",
}) {
  const input =
    document.createElement("input");

  input.type = type;
  input.placeholder = placeholder;
  input.className = "input";

  return input;
}

function createTextarea({
  placeholder = "",
}) {
  const textarea =
    document.createElement("textarea");

  textarea.placeholder =
    placeholder;

  textarea.className =
    "textarea";

  return textarea;
}

function createSelect(options = []) {
  const select =
    document.createElement("select");

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
  const label =
    document.createElement("label");

  label.className =
    "input-label";

  label.textContent = text;

  return label;
}

function createField({
  label,
  input,
}) {
  const wrapper =
    document.createElement("div");

  wrapper.appendChild(
    createLabel(label)
  );

  wrapper.appendChild(input);

  return wrapper;
}

/* =========================================================
   🎭 EVENTO CARD
========================================================= */

function createEventoCard() {
  const card =
    document.createElement("div");

  card.className =
    "event-card animate-fade";

  const grid =
    document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const fields = [
    {
      label: "Nome do evento",
      placeholder:
        "Ex: Guerra Carmesim",
    },
    {
      label: "Quem deu a ideia?",
      placeholder:
        "Nome do criador",
    },
    {
      label:
        "Data programada para início e término",
      placeholder:
        "Ex: 10/05 19h até 11/05 21h",
    },
    {
      label:
        "Data real de início e término",
      placeholder:
        "Ex: 10/05 20h até 11/05 22h",
    },
    {
      label: "Vencedor",
      placeholder:
        "Nome do vencedor",
    },
    {
      label: "Prêmio",
      placeholder:
        "Ex: 50 pontos",
    },
  ];

  fields.forEach((field) => {
    grid.appendChild(
      createField({
        label: field.label,
        input: createInput({
          placeholder:
            field.placeholder,
        }),
      })
    );
  });

  card.appendChild(grid);

  const contribuintes =
    createField({
      label:
        "Contribuintes ativos do evento",
      input: createTextarea({
        placeholder:
          "Separe os nomes por vírgula",
      }),
    });

  contribuintes.classList.add(
    "mt-6"
  );

  card.appendChild(
    contribuintes
  );

  const adversidades =
    createField({
      label:
        "Informações adversas",
      input: createTextarea({
        placeholder:
          "Problemas, atrasos, conflitos...",
      }),
    });

  adversidades.classList.add(
    "mt-6"
  );

  card.appendChild(
    adversidades
  );

  const removeButton =
    document.createElement("button");

  removeButton.type =
    "button";

  removeButton.className =
    "remove-button";

  removeButton.textContent =
    "Remover evento";

  removeButton.addEventListener(
    "click",
    () => {
      card.remove();
      atualizarMetricas();
    }
  );

  card.appendChild(
    removeButton
  );

  return card;
}

/* =========================================================
   ⚠️ FALTA CARD
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

  const membroField =
    createField({
      label:
        "🔖 Membro em questão",
      input: createInput({
        placeholder:
          "Nome do membro",
      }),
    });

  const ocorridoField =
    createField({
      label:
        "⁉️ O que aconteceu?",
      input: createInput({
        placeholder:
          "Descrição da ocorrência",
      }),
    });

  const quantidadeField =
    createField({
      label:
        "⚠️ Nº de vezes",
      input: createInput({
        type: "number",
        placeholder: "0",
      }),
    });

  const advertenciaField =
    createField({
      label:
        "🛑 Aplicou advertência?",
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

  removeButton.type =
    "button";

  removeButton.className =
    "remove-button";

  removeButton.textContent =
    "Remover falta";

  removeButton.addEventListener(
    "click",
    () => {
      card.remove();
      atualizarMetricas();
    }
  );

  card.appendChild(
    removeButton
  );

  return card;
}

/* =========================================================
   📈 MÉTRICAS
========================================================= */

function atualizarMetricas() {
  metricas.eventos =
    document.querySelectorAll(
      ".event-card"
    ).length;

  metricas.faltas =
    faltasContainer.children.length;

  let participantes = 0;

  document
    .querySelectorAll(
      ".event-card textarea:first-of-type"
    )
    .forEach((textarea) => {
      const valor =
        textarea.value.trim();

      if (!valor) return;

      participantes +=
        valor
          .split(",")
          .map((nome) =>
            nome.trim()
          )
          .filter(Boolean).length;
    });

  metricas.participantes =
    participantes;

  document.querySelector(
    "#metrica-eventos"
  ).textContent =
    metricas.eventos;

  document.querySelector(
    "#metrica-participantes"
  ).textContent =
    metricas.participantes;

  document.querySelector(
    "#metrica-faltas"
  ).textContent =
    metricas.faltas;
}

/* =========================================================
   🚀 EVENTS
========================================================= */

document
  .querySelector("#add-evento")
  ?.addEventListener(
    "click",
    () => {
      eventosContainer.appendChild(
        createEventoCard()
      );

      atualizarMetricas();
    }
  );

document
  .querySelector("#add-falta")
  ?.addEventListener(
    "click",
    () => {
      faltasContainer.appendChild(
        createFaltaCard()
      );

      atualizarMetricas();
    }
  );

document.addEventListener(
  "input",
  atualizarMetricas
);

gerarPDFButton?.addEventListener(
  "click",
  async () => {
    try {
      gerarPDFButton.disabled = true;

      gerarPDFButton.innerHTML =
        "🎭 Gerando relatório...";

      atualizarMetricas();

      await gerarPDF({
        filename:
          "relatorio-comite-eventos.pdf",
      });
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao gerar relatório PDF."
      );
    } finally {
      gerarPDFButton.disabled = false;

      gerarPDFButton.innerHTML =
        "📄 Gerar Relatório PDF";
    }
  }
);

/* =========================================================
   ⚡ INIT
========================================================= */

eventosContainer?.appendChild(
  createEventoCard()
);

faltasContainer?.appendChild(
  createFaltaCard()
);

atualizarMetricas();

console.log(
  "%c🎭 Comitê de Eventos iniciado.",
  "color:#d946ef;font-size:14px;font-weight:bold;"
);
