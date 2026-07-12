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

const gerarWhatsappButton =
  document.querySelector("#gerar-whatsapp");

/* =========================================================
   MÉTRICAS
========================================================= */

const metricas = {
  compras: 0,
  servicos: 0,
  contribuintes: 0,
};

/* =========================================================
   HELPERS
========================================================= */

function createInput({
  type = "text",
  placeholder = "",
}) {
  const input =
    document.createElement(
      "input"
    );

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

function createSelect(options) {
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
    option.textContent =
      item;

    select.appendChild(
      option
    );
  });

  return select;
}

function createLabel(text) {
  const label =
    document.createElement(
      "label"
    );

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
    document.createElement(
      "div"
    );

  wrapper.appendChild(
    createLabel(label)
  );

  wrapper.appendChild(input);

  return wrapper;
}

function createRemoveButton(
  card
) {
  const button =
    document.createElement(
      "button"
    );

  button.type = "button";

  button.className =
    "remove-button";

  button.textContent =
    "Remover";

  button.addEventListener(
    "click",
    () => {
      card.remove();
      atualizarMetricas();
    }
  );

  return button;
}

/* =========================================================
   COMPRA
========================================================= */
function createCompraCard() {
  const card = document.createElement("div");

  card.className = "event-card animate-fade";

  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const fields = [
    {
      label: "Serviço",
      placeholder: "Ex: Capa Premium",
    },
    {
      label: "Nome do cliente",
      placeholder: "Nome do cliente",
    },
    {
      label: "Data da compra",
      placeholder: "Ex: 12/07/2026",
    },
    {
      label: "Contribuinte responsável",
      placeholder: "Nome do responsável",
    },
  ];

  fields.forEach((field) => {
    grid.appendChild(
      createField({
        label: field.label,
        input: createInput({
          placeholder: field.placeholder,
        }),
      })
    );
  });

  card.appendChild(grid);

  card.appendChild(
    createRemoveButton(card)
  );

  return card;
}

/* =========================================================
   CONTRIBUINTE
========================================================= */

function createContribuinteCard() {
  const card = document.createElement("div");

  card.className = "event-card animate-fade";

  const grid = document.createElement("div");

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  const fields = [
    {
      label: "Nome do contribuinte",
      placeholder: "Nome",
    },
    {
      label: "Serviço fornecido",
      placeholder: "Ex: Banner",
    },
    {
      label: "Prazo de entrega",
      placeholder: "Ex: 15/07",
    },
    {
      label: "Data da entrega",
      placeholder: "Ex: 14/07",
    },
    {
      label: "N° de serviços entregues",
      placeholder: "0",
      type: "number",
    },
  ];

  fields.forEach((field) => {
    grid.appendChild(
      createField({
        label: field.label,
        input: createInput({
          type: field.type || "text",
          placeholder: field.placeholder,
        }),
      })
    );
  });

  card.appendChild(grid);

  card.appendChild(
    createRemoveButton(card)
  );

  return card;
}

/* =========================================================
   FALTA
========================================================= */

function createFaltaCard() {
  const card =
    document.createElement(
      "div"
    );

  card.className =
    "metric-card animate-fade";

  const grid =
    document.createElement(
      "div"
    );

  grid.className =
    "grid grid-cols-1 lg:grid-cols-4 gap-6";

  grid.append(
    createField({
      label: "Membro",
      input: createInput({
        placeholder:
          "Nome",
      }),
    }),

    createField({
      label:
        "Ocorrência",
      input: createInput({
        placeholder:
          "Descrição",
      }),
    }),

    createField({
      label:
        "Quantidade",
      input: createInput({
        type: "number",
        placeholder: "1",
      }),
    }),

    createField({
      label:
        "Advertência",
      input: createSelect([
        "Selecione",
        "Sim",
        "Não",
      ]),
    })
  );

  card.appendChild(grid);

  card.appendChild(
    createRemoveButton(card)
  );

  return card;
}

/* =========================================================
   COLETA
========================================================= */

function coletarCompras() {
  return [
    ...document.querySelectorAll(
      "#compras-container .event-card"
    ),
  ].map((card) => {
    const inputs = card.querySelectorAll("input");

    return {
      servico: inputs[0]?.value || "",
      cliente: inputs[1]?.value || "",
      dataCompra: inputs[2]?.value || "",
      contribuinte: inputs[3]?.value || "",
    };
  });
}

function coletarContribuintes() {
  return [
    ...document.querySelectorAll(
      "#contribuintes-container .event-card"
    ),
  ].map((card) => {
    const inputs = card.querySelectorAll("input");

    return {
      nome: inputs[0]?.value || "",
      servico: inputs[1]?.value || "",
      prazo: inputs[2]?.value || "",
      entrega: inputs[3]?.value || "",
      quantidade: inputs[4]?.value || "",
    };
  });
}

function coletarFaltas() {
  return [
    ...faltasContainer.children,
  ].map((card) => {
    const campos =
      card.querySelectorAll(
        "input, select"
      );

    return {
      membro:
        campos[0]?.value || "",
      ocorrido:
        campos[1]?.value || "",
      quantidade:
        campos[2]?.value || "",
      advertencia:
        campos[3]?.value || "",
    };
  });
}

/* =========================================================
   MÉTRICAS
========================================================= */

function atualizarMetricas() {
  metricas.compras =
    comprasContainer.children
      .length;

  metricas.contribuintes =
    contribuintesContainer
      .children.length;

  let servicos = 0;

  coletarContribuintes()
    .forEach((item) => {
      servicos += Number(
        item.quantidade || 0
      );
    });

  metricas.servicos =
    servicos;

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
   EVENTOS
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

gerarWhatsappButton.addEventListener("click", gerarWhatsapp);

/* =========================================================
   INIT
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

function gerarWhatsapp() {
  const mes = document.querySelector("#mes").value;
  const compras = coletarCompras();
  const contribuintes = coletarContribuintes();
  const faltas = coletarFaltas();

  const obrasExtras =
    document.querySelector("#obras-extras").value;

  let mensagem =
`🌫️💬 Relatório mensal - Comitê de Compra e Venda

♦️ Mês: ${mes}

📇 Compras realizadas:
`;

  compras.forEach((compra, i) => {
    mensagem += `
${i + 1}.
• Serviço: ${compra.servico}
• Nome do cliente: ${compra.cliente}
• Data da compra: ${compra.dataCompra}
• Contribuinte responsável: ${compra.contribuinte}

`;
  });

  mensagem += `📇 Contribuintes ativos:

`;

  contribuintes.forEach((c, i) => {
    mensagem += `
${i + 1}.
• Nome do contribuinte: ${c.nome}
• Serviço fornecido: ${c.servico}
• Prazo de entrega: ${c.prazo}
• Data da entrega: ${c.entrega}
• Nº de serviços entregues: ${c.quantidade}

`;
  });

  mensagem += `
♦️ Nº compras realizadas no geral: ${compras.length}

♦️ Obras extras pagas conforme o combinado?
${obrasExtras || "Nenhuma"}

♦️ Faltas cometidas:

`;

  faltas.forEach((f, i) => {
    mensagem += `
${i + 1}.
🔖 Membro: ${f.membro}
⁉️ O que aconteceu?: ${f.ocorrido}
⚠️ Nº de vezes: ${f.quantidade}
🛑 Aplicou advertência?: ${f.advertencia}

`;
  });

  navigator.clipboard.writeText(mensagem);

  alert("Relatório copiado para a área de transferência!");
}

console.log(
  "%c📦 Comitê de Compras iniciado.",
  "color: orange; font-weight:bold;"
);
