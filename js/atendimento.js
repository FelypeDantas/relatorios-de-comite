document
  .getElementById("gerar-whatsapp")
  .addEventListener("click", gerarMensagemWhatsapp);

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
