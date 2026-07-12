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
  const card =
    document.createElement(
      "div"
    );

  card.className =
    "event-card animate-fade";

  const grid =
    document.createElement(
      "div"
    );

  grid.className =
    "grid grid-cols-1 lg:grid-cols-2 gap-6";

  grid.append(
    createField({
      label: "Item",
      input: createInput({
        placeholder:
          "Nome do item",
      }),
    }),

    createField({
      label: "Quantidade",
      input: createInput({
        type: "number",
        placeholder: "1",
      }),
    }),

    createField({
      label: "Valor",
      input: createInput({
        placeholder:
          "Ex: 500",
      }),
    }),

    createField({
      label: "Fornecedor",
      input: createInput({
        placeholder:
          "Nome do fornecedor",
      }),
    }),

    createField({
      label: "Responsável",
      input: createInput({
        placeholder:
          "Quem realizou",
      }),
    })
  );

  card.appendChild(grid);

  const obs =
    createField({
      label:
        "Observações",
      input: createTextarea({
        placeholder:
          "Detalhes da compra...",
      }),
    });

  obs.classList.add(
    "mt-6"
  );

  card.appendChild(obs);

  card.appendChild(
    createRemoveButton(card)
  );

  return card;
}

/* =========================================================
   CONTRIBUINTE
========================================================= */

function createContribuinteCard() {
  const card =
    document.createElement(
      "div"
    );

  card.className =
    "event-card animate-fade";

  const grid =
    document.createElement(
      "div"
    );

  grid.className =
    "grid grid-cols-1 lg:grid-cols-3 gap-6";

  grid.append(
    createField({
      label: "Nome",
      input: createInput({
        placeholder:
          "Nome",
      }),
    }),

    createField({
      label:
        "Serviços realizados",
      input: createInput({
        placeholder:
          "Ex: 4",
      }),
    }),

    createField({
      label:
        "Entregas realizadas",
      input: createInput({
        placeholder:
          "Ex: 8",
      }),
    })
  );

  card.appendChild(grid);

  const obs =
    createField({
      label:
        "Observações",
      input: createTextarea({
        placeholder:
          "Desempenho...",
      }),
    });

  obs.classList.add(
    "mt-6"
  );

  card.appendChild(obs);

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
    const inputs =
      card.querySelectorAll(
        "input"
      );

    const textarea =
      card.querySelector(
        "textarea"
      );

    return {
      item:
        inputs[0]?.value || "",
      quantidade:
        inputs[1]?.value || "",
      valor:
        inputs[2]?.value || "",
      fornecedor:
        inputs[3]?.value || "",
      responsavel:
        inputs[4]?.value || "",
      observacoes:
        textarea?.value || "",
    };
  });
}

function coletarContribuintes() {
  return [
    ...document.querySelectorAll(
      "#contribuintes-container .event-card"
    ),
  ].map((card) => {
    const inputs =
      card.querySelectorAll(
        "input"
      );

    const textarea =
      card.querySelector(
        "textarea"
      );

    return {
      nome:
        inputs[0]?.value || "",
      servicos:
        inputs[1]?.value || "",
      entregas:
        inputs[2]?.value || "",
      observacoes:
        textarea?.value || "",
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
        item.servicos || 0
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

/* =========================================================
   PDF
========================================================= */

gerarPDFButton?.addEventListener(
  "click",
  async () => {
    try {
      gerarPDFButton.disabled =
        true;

      gerarPDFButton.innerHTML =
        "Gerando PDF...";

      await gerarPDFCompras({
        mes:
          document.querySelector(
            "#mes"
          ).value,

        ano:
          document.querySelector(
            "#ano"
          ).value,

        compras:
          coletarCompras(),

        contribuintes:
          coletarContribuintes(),

        obrasExtras:
          document.querySelector(
            "#obras-extras"
          ).value,

        faltas:
          coletarFaltas(),

        observacoes:
          document.querySelector(
            "#observacoes"
          ).value,
      });
    } finally {
      gerarPDFButton.disabled =
        false;

      gerarPDFButton.innerHTML =
        "📄 Gerar Relatório PDF";
    }
  }
);

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

console.log(
  "%c📦 Comitê de Compras iniciado.",
  "color: orange; font-weight:bold;"
);
