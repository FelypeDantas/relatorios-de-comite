/* =========================================================
   🎭 SANGUE CARMESIM • COMITÊ DE EVENTOS
========================================================= */

const eventosContainer =
  document.querySelector(
    "#eventos-container"
  );

const faltasContainer =
  document.querySelector(
    "#faltas-container"
  );

const gerarPDFButton =
  document.querySelector(
    "#gerar-pdf"
  );

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

  input.placeholder =
    placeholder;

  input.className = "input";

  return input;
}

function createTextarea({
  placeholder = "",
}) {
  const textarea =
    document.createElement(
      "textarea"
    );

  textarea.placeholder =
    placeholder;

  textarea.className =
    "textarea";

  return textarea;
}

function createSelect(options = []) {
  const select =
    document.createElement(
      "select"
    );

  select.className =
    "select";

  options.forEach((item) => {
    const option =
      document.createElement(
        "option"
      );

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
        "Data programada",
      placeholder:
        "Ex: 10/05 às 19h",
    },
    {
      label: "Data real",
      placeholder:
        "Ex: 10/05 às 20h",
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
        "Contribuintes ativos",
      input: createTextarea({
        placeholder:
          "Liste os contribuintes...",
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
    document.createElement(
      "button"
    );

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

  atualizarMetricas();

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
        "Membro em questão",
      input: createInput({
        placeholder:
          "Nome do membro",
      }),
    });

  const ocorridoField =
    createField({
      label:
        "O que aconteceu?",
      input: createInput({
        placeholder:
          "Descrição da ocorrência",
      }),
    });

  const quantidadeField =
    createField({
      label:
        "N° de vezes",
      input: createInput({
        type: "number",
        placeholder: "0",
      }),
    });

  const advertenciaField =
    createField({
      label:
        "Aplicou advertência?",
      input: createSelect([
        "Selecione",
        "Sim",
        "Não",
      ]),
    });

  grid.appendChild(
    membroField
  );

  grid.appendChild(
    ocorridoField
  );

  grid.appendChild(
    quantidadeField
  );

  grid.appendChild(
    advertenciaField
  );

  card.appendChild(grid);

  const removeButton =
    document.createElement(
      "button"
    );

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

  atualizarMetricas();

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
      ".event-card textarea"
    )
    .forEach((textarea, index) => {
      if (index % 2 === 0) {
        const valor =
          textarea.value.trim();

        if (!valor) return;

        participantes +=
          valor
            .split(",")
            .filter(Boolean)
            .length;
      }
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
   📥 COLETA
========================================================= */

function coletarEventos() {
  return [
    ...document.querySelectorAll(
      ".event-card"
    ),
  ].map((card) => {
    const inputs =
      card.querySelectorAll(
        "input"
      );

    const textareas =
      card.querySelectorAll(
        "textarea"
      );

    return {
      nome:
        inputs[0]?.value || "",

      criador:
        inputs[1]?.value || "",

      dataProgramada:
        inputs[2]?.value || "",

      dataReal:
        inputs[3]?.value || "",

      vencedor:
        inputs[4]?.value || "",

      premio:
        inputs[5]?.value || "",

      contribuintes:
        textareas[0]?.value || "",

      adversidades:
        textareas[1]?.value || "",
    };
  });
}

function coletarFaltas() {
  return [
    ...faltasContainer.children,
  ].map((card) => {
    const inputs =
      card.querySelectorAll(
        "input, select"
      );

    return {
      membro:
        inputs[0]?.value || "",

      ocorrido:
        inputs[1]?.value || "",

      quantidade:
        inputs[2]?.value || "",

      advertencia:
        inputs[3]?.value || "",
    };
  });
}

/* =========================================================
   📄 PDF
========================================================= */

function gerarRelatorioHTML() {
  const mes =
    document.querySelector(
      "#mes"
    )?.value || "";

  const ano =
    document.querySelector(
      "#ano"
    )?.value || "";

  const resumo =
    document.querySelector(
      "#resumo-geral"
    )?.value || "";

  const observacoes =
    document.querySelector(
      "#observacoes"
    )?.value || "";

  const eventos =
    coletarEventos();

  const faltas =
    coletarFaltas();

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
        Comitê de Eventos • Sangue Carmesim
      </p>

      <hr />

      <h2 style="margin-top: 30px;">
        Informações gerais
      </h2>

      <ul>
        <li>
          <strong>Mês:</strong>
          ${mes}
        </li>

        <li>
          <strong>Ano:</strong>
          ${ano}
        </li>
      </ul>

      <h2 style="margin-top: 30px;">
        Eventos realizados
      </h2>

      ${
        eventos.length === 0
          ? "<p>Nenhum evento registrado.</p>"
          : eventos
              .map(
                (
                  evento,
                  index
                ) => `
            <div
              style="
                margin-bottom: 30px;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 16px;
              "
            >

              <h3>
                Evento ${
                  index + 1
                }
              </h3>

              <p>
                <strong>Nome:</strong>
                ${evento.nome}
              </p>

              <p>
                <strong>Criador:</strong>
                ${evento.criador}
              </p>

              <p>
                <strong>Programado:</strong>
                ${evento.dataProgramada}
              </p>

              <p>
                <strong>Real:</strong>
                ${evento.dataReal}
              </p>

              <p>
                <strong>Vencedor:</strong>
                ${evento.vencedor}
              </p>

              <p>
                <strong>Prêmio:</strong>
                ${evento.premio}
              </p>

              <p>
                <strong>Contribuintes:</strong>
                ${evento.contribuintes}
              </p>

              <p>
                <strong>Adversidades:</strong>
                ${evento.adversidades}
              </p>

            </div>
          `
              )
              .join("")
      }

      <h2 style="margin-top: 30px;">
        Resumo geral
      </h2>

      <p>
        ${
          resumo ||
          "Nenhum resumo registrado."
        }
      </p>

      <h2 style="margin-top: 30px;">
        Faltas cometidas
      </h2>

      ${
        faltas.length === 0
          ? "<p>Nenhuma falta registrada.</p>"
          : faltas
              .map(
                (
                  falta
                ) => `
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
          observacoes ||
          "Nenhuma observação registrada."
        }
      </p>

    </div>
  `;
}

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
    document.createElement("div");

  container.innerHTML =
    gerarRelatorioHTML();

  const options = {
    margin: 0.5,

    filename:
      "relatorio-comite-eventos.pdf",

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
      orientation:
        "portrait",
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
  .querySelector(
    "#add-evento"
  )
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
  .querySelector(
    "#add-falta"
  )
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
      gerarPDFButton.disabled =
        true;

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
      gerarPDFButton.disabled =
        false;

      gerarPDFButton.innerHTML =
        "📄 Gerar relatório PDF";
    }
  }
);

/* =========================================================
   ⚡ INIT
========================================================= */

eventosContainer.appendChild(
  createEventoCard()
);

faltasContainer.appendChild(
  createFaltaCard()
);

atualizarMetricas();

console.log(
  "%c🎭 Comitê de Eventos iniciado.",
  "color: crimson; font-size: 14px; font-weight: bold;"
);