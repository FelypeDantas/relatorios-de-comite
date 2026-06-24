/* =========================================================
   📄 PDF • COMPRAS & VENDAS
========================================================= */

export async function gerarPDFCompras({
  mes,
  ano,
  compras,
  contribuintes,
  obrasExtras,
  faltas,
  observacoes,
}) {
  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  let y = 20;

  const novaLinha = (valor = 10) => {
    y += valor;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
  };

  const titulo = (texto) => {
    pdf.setFontSize(18);
    pdf.setFont(undefined, "bold");
    pdf.text(texto, 14, y);
    novaLinha(10);
  };

  const subtitulo = (texto) => {
    pdf.setFontSize(13);
    pdf.setFont(undefined, "bold");
    pdf.text(texto, 14, y);
    novaLinha(8);
  };

  const linha = (texto) => {
    pdf.setFontSize(11);
    pdf.setFont(undefined, "normal");

    const textoQuebrado =
      pdf.splitTextToSize(texto, 180);

    pdf.text(textoQuebrado, 14, y);

    novaLinha(textoQuebrado.length * 6);
  };

  /* =======================================================
     CABEÇALHO
  ======================================================= */

  titulo("📦 Relatório Mensal");
  linha("Comitê de Compras & Vendas • Sangue Carmesim");

  novaLinha();

  subtitulo("📌 Informações Gerais");

  linha(`Mês: ${mes}`);
  linha(`Ano: ${ano}`);

  novaLinha();

  /* =======================================================
     COMPRAS
  ======================================================= */

  subtitulo("🛒 Compras Realizadas");

  if (!compras.length) {
    linha("Nenhuma compra registrada.");
  } else {
    compras.forEach((compra, index) => {
      linha(`━━━━━━━━━━━━━━━━━━━━`);
      linha(`Compra ${index + 1}`);

      linha(`Item: ${compra.item}`);
      linha(`Quantidade: ${compra.quantidade}`);
      linha(`Valor: ${compra.valor}`);
      linha(`Fornecedor: ${compra.fornecedor}`);
      linha(`Responsável: ${compra.responsavel}`);
      linha(`Observações: ${compra.observacoes}`);

      novaLinha();
    });
  }

  /* =======================================================
     CONTRIBUINTES
  ======================================================= */

  subtitulo("👥 Contribuintes Ativos");

  if (!contribuintes.length) {
    linha("Nenhum contribuinte registrado.");
  } else {
    contribuintes.forEach(
      (contribuinte, index) => {
        linha(`━━━━━━━━━━━━━━━━━━━━`);
        linha(
          `Contribuinte ${index + 1}`
        );

        linha(
          `Nome: ${contribuinte.nome}`
        );

        linha(
          `Serviços realizados: ${contribuinte.servicos}`
        );

        linha(
          `Entregas realizadas: ${contribuinte.entregas}`
        );

        linha(
          `Observações: ${contribuinte.observacoes}`
        );

        novaLinha();
      }
    );
  }

  /* =======================================================
     OBRAS EXTRAS
  ======================================================= */

  subtitulo("💰 Obras Extras");

  linha(
    obrasExtras ||
      "Nenhuma informação registrada."
  );

  novaLinha();

  /* =======================================================
     FALTAS
  ======================================================= */

  subtitulo(
    "⚠️ Faltas e Advertências"
  );

  if (!faltas.length) {
    linha("Nenhuma falta registrada.");
  } else {
    faltas.forEach(
      (falta, index) => {
        linha(`━━━━━━━━━━━━━━━━━━━━`);
        linha(
          `Ocorrência ${index + 1}`
        );

        linha(
          `Membro: ${falta.membro}`
        );

        linha(
          `O que aconteceu: ${falta.ocorrido}`
        );

        linha(
          `Quantidade: ${falta.quantidade}`
        );

        linha(
          `Advertência: ${falta.advertencia}`
        );

        novaLinha();
      }
    );
  }

  /* =======================================================
     OBSERVAÇÕES
  ======================================================= */

  subtitulo("📝 Observações Finais");

  linha(
    observacoes ||
      "Nenhuma observação registrada."
  );

  /* =======================================================
     SALVAR
  ======================================================= */

  pdf.save(
    `relatorio-compras-${mes}-${ano}.pdf`
  );
}