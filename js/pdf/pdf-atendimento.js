export async function gerarPDF({
  filename = "relatorio-atendimento.pdf",
}) {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  let y = 20;

  const escrever = (
    texto,
    tamanho = 11,
    espacamento = 8
  ) => {
    pdf.setFontSize(tamanho);
    pdf.text(texto, 15, y);
    y += espacamento;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
  };

  /* ========================
     INFORMAÇÕES GERAIS
  ======================== */

  const mes =
    document.querySelector("#mes")
      ?.value || "-";

  const ano =
    document.querySelector("#ano")
      ?.value || "-";

  const meta =
    document.querySelector("#meta")
      ?.value || "-";

  escrever(
    "Relatório mensal – Comitê de Atendimento ",
    18,
    12
  );

  escrever(
    `Mês: ${mes}`
  );

  escrever(
    `Ano: ${ano}`
  );

  escrever(
    `Meta: ${meta}`
  );

  y += 5;

  /* ========================
     SEMANAS
  ======================== */

  document
    .querySelectorAll(
      "[data-semana]"
    )
    .forEach(
      (
        container,
        indiceSemana
      ) => {
        escrever(
          `SEMANA ${
            indiceSemana + 1
          }`,
          14,
          10
        );

        const cards =
          container.querySelectorAll(
            ".adm-card"
          );

        if (!cards.length) {
          escrever(
            "Nenhum ADM registrado."
          );
          return;
        }

        cards.forEach(
          (card, index) => {
            const adm =
              card.querySelector(
                '[data-field="adm"]'
              )?.value || "-";

            const contribuicao =
              card.querySelector(
                '[data-field="contribuicao"]'
              )?.value || "-";

            const prazo =
              card.querySelector(
                '[data-field="prazo"]'
              )?.value || "-";

            escrever(
              `ADM ${
                index + 1
              }: ${adm}`
            );

            escrever(
              `Contribuição: ${contribuicao}`
            );

            escrever(
              `Prazo Cumprido: ${prazo}`
            );

            y += 4;
          }
        );

        y += 8;
      }
    );

  /* ========================
     FALTAS
  ======================== */

  escrever(
    "FALTAS E ADVERTÊNCIAS",
    14,
    10
  );

  const faltas =
    document.querySelectorAll(
      "#faltas-container .adm-card"
    );

  if (!faltas.length) {
    escrever(
      "Nenhuma falta registrada."
    );
  } else {
    faltas.forEach(
      (card, index) => {
        const adm =
          card.querySelector(
            '[data-field="adm"]'
          )?.value || "-";

        const ocorrido =
          card.querySelector(
            '[data-field="ocorrido"]'
          )?.value || "-";

        const quantidade =
          card.querySelector(
            '[data-field="quantidade"]'
          )?.value || "-";

        const advertencia =
          card.querySelector(
            '[data-field="advertencia"]'
          )?.value || "-";

        escrever(
          `Registro ${
            index + 1
          }`
        );

        escrever(
          `ADM: ${adm}`
        );

        escrever(
          `Ocorrido: ${ocorrido}`
        );

        escrever(
          `Quantidade: ${quantidade}`
        );

        escrever(
          `Advertência: ${advertencia}`
        );

        y += 4;
      }
    );
  }

  /* ========================
     OBSERVAÇÕES
  ======================== */

  const observacoes =
    document.querySelector(
      "#observacoes"
    )?.value || "-";

  escrever(
    "OBSERVAÇÕES FINAIS",
    14,
    10
  );

  const linhas =
    pdf.splitTextToSize(
      observacoes,
      180
    );

  pdf.text(
    linhas,
    15,
    y
  );

  pdf.save(filename);
}
