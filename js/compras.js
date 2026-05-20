/* =========================================================
   📦 SANGUE CARMESIM • COMPRAS & VENDAS
========================================================= */

const comprasContainer =
  document.querySelector(
    "#compras-container"
  );

const contribuintesContainer =
  document.querySelector(
    "#contribuintes-container"
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
  compras: 0,
  servicos: 0,
  contribuintes: 0,
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

function createRemoveButton(
  text,
  callback
) {
  const button =
    document.createElement(
      "button"
    );

  button.type = "button";

  button.className =
    "remove-button";

  button.textContent = text;

  button.addEventListener(
    "click",
    callback
  );

  return button;
}

/* =========================================================
   🛒 CARD DE COMPRA
========================================================= */

function createCompraCard() {
  const card =
    document.createElement("div");

  card.className =
    "card animate-fade";

  const grid =
    document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const fields = [
    {
      label: "Serviço",
      placeholder:
        "Ex: Banner, capa, edição...",
    },
    {
      label:
        "Nome do cliente",
      placeholder:
        "Nome do cliente",
    },
    {
      label:
        "Data da compra",
      placeholder:
        "Ex: 10/05/2026",
    },
    {
      label:
        "Contribuinte responsável",
      placeholder:
        "Nome do responsável",
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

  const removeButton =
    createRemoveButton(
      "Remover compra",
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
   👥 CARD CONTRIBUINTE
========================================================= */

function createContribuinteCard() {
  const card =
    document.createElement("div");

  card.className =
    "card animate-fade";

  const grid =
    document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const nomeField =
    createField({
      label:
        "Nome do contribuinte",
      input: createInput({
        placeholder:
          "Nome do membro",
      }),
    });

  const servicoField =
    createField({
      label:
        "Serviço fornecido",
      input: createInput({
        placeholder:
          "Ex: Arte, edição...",
      }),
    });

  const prazoField =
    createField({
      label:
        "Prazo de entrega",
      input: createInput({
        placeholder:
          "Ex: 15/05/2026",
      }),
    });

  const entregaField =
    createField({
      label:
        "Data da entrega",
      input: createInput({
        placeholder:
          "Ex: 14/05/2026",
      }),
    });

  const quantidadeField =
    createField({
      label:
        "N° de serviços entregues",
      input: createInput({
        type: "number",
        placeholder: "0",
      }),
    });

  grid.appendChild(
    nomeField
  );

  grid.appendChild(
    servicoField
  );

  grid.appendChild(
    prazoField
  );

  grid.appendChild(
    entregaField
  );

  grid.appendChild(
    quantidadeField
  );

  card.appendChild(grid);

  const removeButton =
    createRemoveButton(
      "Remover contribuinte",
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
   ⚠️ CARD FALTA
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
    createRemoveButton(
      "Remover falta",
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
  metricas.compras =
    document.querySelectorAll(
      "#compras-container .card"
    ).length;

  metricas.contribuintes =
    document.querySelectorAll(
      "#contribuintes-container .card"
    ).length;

  let totalServicos = 0;

  document
    .querySelectorAll(
      "#contribuintes-container input[type='number']"
    )
    .forEach((input) => {
      totalServicos +=
        Number(input.value) || 0;
    });

  metricas.servicos =
    totalServicos;

  document.querySelector(
    "#metrica-compras"
  ).textContent =
    metricas.compras;

  document.querySelector(
    "#metrica-servicos"
  ).textContent =
    metricas.servicos;

  document.querySelector(
    "#metrica-contribuintes"
  ).textContent =
    metricas.contribuintes;
}

/* =========================================================
   📥 COLETA
========================================================= */

function coletarCompras() {
  return [
    ...document.querySelectorAll(
      "#compras-container .card"
    ),
  ].map((card) => {
    const inputs =
      card.querySelectorAll(
        "input"
      );

    return {
      servico:
        inputs[0]?.value || "",

      cliente:
        inputs[1]?.value || "",

      data:
        inputs[2]?.value || "",

      responsavel:
        inputs[3]?.value || "",
    };
  });
}

function coletarContribuintes() {
  return [
    ...document.querySelectorAll(
      "#contribuintes-container .card"
    ),
  ].map((card) => {
    const inputs =
      card.querySelectorAll(
        "input"
      );

    return {
      nome:
        inputs[0]?.value || "",

      servico:
        inputs[1]?.value || "",

      prazo:
        inputs[2]?.value || "",

      entrega:
        inputs[3]?.value || "",

      quantidade:
        inputs[4]?.value || "",
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

  const obrasExtras =
    document.querySelector(
      "#obras-extras"
    )?.value || "";

  const observacoes =
    document.querySelector(
      "#observacoes"
    )?.value || "";

  const compras =
    coletarCompras();

  const contribuintes =
    coletarContribuintes();

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
        Comitê de Compras & Vendas • Sangue Carmesim
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
        Compras realizadas
      </h2>

      ${
        compras.length === 0
          ? "<p>Nenhuma compra registrada.</p>"
          : compras
              .map(
                (
                  compra,
                  index
                ) => `
            <div
              style="
                margin-bottom: 20px;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 14px;
              "
            >

              <h3>
                Compra ${
                  index + 1
                }
              </h3>

              <p>
                <strong>Serviço:</strong>
                ${compra.servico}
              </p>

              <p>
                <strong>Cliente:</strong>
                ${compra.cliente}
              </p>

              <p>
                <strong>Data:</strong>
                ${compra.data}
              </p>

              <p>
                <strong>Responsável:</strong>
                ${compra.responsavel}
              </p>

            </div>
          `
              )
              .join("")
      }

      <h2 style="margin-top: 30px;">
        Contribuintes ativos
      </h2>

      ${
        contribuintes.length === 0
          ? "<p>Nenhum contribuinte registrado.</p>"
          : contribuintes
              .map(
                (
                  contribuinte,
                  index
                ) => `
            <div
              style="
                margin-bottom: 20px;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 14px;
              "
            >

              <h3>
                Contribuinte ${
                  index + 1
                }
              </h3>

              <p>
                <strong>Nome:</strong>
                ${contribuinte.nome}
              </p>

              <p>
                <strong>Serviço:</strong>
                ${contribuinte.servico}
              </p>

              <p>
                <strong>Prazo:</strong>
                ${contribuinte.prazo}
              </p>

              <p>
                <strong>Entrega:</strong>
                ${contribuinte.entrega}
              </p>

              <p>
                <strong>Serviços entregues:</strong>
                ${contribuinte.quantidade}
              </p>

            </div>
          `
              )
              .join("")
      }

      <h2 style="margin-top: 30px;">
        Métricas gerais
      </h2>

      <ul>
        <li>
          <strong>Total de compras:</strong>
          ${metricas.compras}
        </li>

        <li>
          <strong>Total de serviços:</strong>
          ${metricas.servicos}
        </li>

        <li>
          <strong>Contribuintes ativos:</strong>
          ${metricas.contribuintes}
        </li>
      </ul>

      <h2 style="margin-top: 30px;">
        Obras extras
      </h2>

      <p>
        ${
          obrasExtras ||
          "Nenhuma observação registrada."
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
      "relatorio-compras-vendas.pdf",

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
    "#add-compra"
  )
  ?.addEventListener(
    "click",
    () => {
      comprasContainer.appendChild(
        createCompraCard()
      );

      atualizarMetricas();
    }
  );

document
  .querySelector(
    "#add-contribuinte"
  )
  ?.addEventListener(
    "click",
    () => {
      contribuintesContainer.appendChild(
        createContribuinteCard()
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

comprasContainer.appendChild(
  createCompraCard()
);

contribuintesContainer.appendChild(
  createContribuinteCard()
);

faltasContainer.appendChild(
  createFaltaCard()
);

atualizarMetricas();

console.log(
  "%c📦 Comitê de Compras & Vendas iniciado.",
  "color: orange; font-size: 14px; font-weight: bold;"
);