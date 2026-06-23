export async function gerarPDF({
  filename = "relatorio-comite-somas.pdf",
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

  const valor = (id) =>
    document.querySelector(id)?.value || "-";

  escrever(
    "🌫️💬 Relatório mensal - Comitê de Somas",
    16,
    12
  );

  escrever(`♦️ Mês: ${valor("#mes")}`);

  escrever(
    `♦️ Quantidade de relatórios calculados no total no final do mês: ${valor(
      "#total-geral"
    )}`
  );

  y += 5;

  escrever("📇 1° Semana", 14);

  escrever(
    `N° de relatórios sobre adms de estantes aleatórias calculados: ${valor(
      "#s1-aleatorios"
    )}`
  );

  escrever(
    `N° de relatórios sobre ADMs FIXO calculados: ${valor(
      "#s1-fixos"
    )}`
  );

  escrever(
    `N° de relatórios sobre membros comuns calculados: ${valor(
      "#s1-comuns"
    )}`
  );

  y += 5;

  escrever("📇 2° Semana", 14);

  escrever(
    `N° de relatórios sobre adms de estantes aleatórias calculados: ${valor(
      "#s2-aleatorios"
    )}`
  );

  escrever(
    `N° de relatórios sobre ADMs FIXO calculados: ${valor(
      "#s2-fixos"
    )}`
  );

  escrever(
    `N° de relatórios sobre membros comuns calculados: ${valor(
      "#s2-comuns"
    )}`
  );

  y += 5;

  escrever("📇 3° Semana", 14);

  escrever(
    `N° de relatórios sobre adms de estantes aleatórias calculados: ${valor(
      "#s3-aleatorios"
    )}`
  );

  escrever(
    `N° de relatórios sobre ADMs FIXO calculados: ${valor(
      "#s3-fixos"
    )}`
  );

  escrever(
    `N° de relatórios sobre membros comuns calculados: ${valor(
      "#s3-comuns"
    )}`
  );

  y += 5;

  escrever("📇 4° Semana", 14);

  escrever("⚠️ Pausa ⚠️");

  y += 5;

  escrever(
    "♦️ Quantidade de relatórios calculada por membro do comitê:",
    14
  );

  document
    .querySelectorAll(
      "#membros-container .metric-card"
    )
    .forEach((card) => {
      const inputs =
        card.querySelectorAll("input");

      const nome =
        inputs[0]?.value || "-";

      const quantidade =
        inputs[1]?.value || "0";

      escrever(
        `${nome}: ${quantidade}`
      );
    });

  y += 5;

  escrever(
    "♦️ Destaques do mês",
    14
  );

  escrever(
    `Top 3 membros com mais pontos: ${valor(
      "#top-membros"
    )}`
  );

  escrever(
    `Top 3 ADMs com mais pontos: ${valor(
      "#top-adms"
    )}`
  );

  escrever(
    `2 membros que mais se destacaram: ${valor(
      "#destaques-comite"
    )}`
  );

  y += 5;

  escrever(
    "♦️ Faltas cometidas",
    14
  );

  document
    .querySelectorAll(
      "#faltas-wrapper .metric-card"
    )
    .forEach((card) => {
      const campos =
        card.querySelectorAll(
          "input, select"
        );

      escrever(
        `🔖 Membro em questão: ${
          campos[0]?.value || "-"
        }`
      );

      escrever(
        `⁉️ O que aconteceu?: ${
          campos[1]?.value || "-"
        }`
      );

      escrever(
        `⚠️ N° de vezes em que aconteceu: ${
          campos[2]?.value || "-"
        }`
      );

      escrever(
        `🛑 Aplicou advertência?: ${
          campos[3]?.value || "-"
        }`
      );

      y += 4;
    });

  y += 5;

  escrever(
    "📝 Observações finais",
    14
  );

  const observacoes =
    valor("#observacoes");

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