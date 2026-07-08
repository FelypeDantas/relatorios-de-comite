document
  .getElementById("gerar-whatsapp")
  .addEventListener("click", gerarMensagemWhatsapp);

async function gerarMensagemWhatsapp() {

  const meta = document.getElementById("meta").value.trim();
  const observacoes = document.getElementById("observacoes").value.trim();

  let mensagem = "";

  mensagem += "🌫️💬 *Relatório mensal – Comitê de Atendimento*\n\n";

  mensagem += "♦️ *Meta de atendimento*:\n";
  mensagem += `${meta || "-"}\n\n`;

  // SEMANAS
  for (let semana = 1; semana <= 4; semana++) {

    mensagem += `📇 *${semana}° Semana*:\n\n`;

    const cards = document.querySelectorAll(
      `[data-semana="${semana}"] .adm-card`
    );

    cards.forEach(card => {

      const adm =
        card.querySelector(".adm-nome")?.value || "-";

      const contribuicao =
        card.querySelector(".adm-contribuicao")?.value || "-";

      const prazo =
        card.querySelector(".adm-prazo")?.value || "-";

      mensagem +=
        `*Adm*: ${adm}
        Contribuição: ${contribuicao}
        Prazo Cumprido?: ${prazo}
        
        `;

    });

    mensagem += "\n";
  }

  mensagem += "♦️ *Faltas Cometidas:*\n\n";

  const faltas = document.querySelectorAll(".falta-card");

  if (faltas.length === 0) {

    mensagem += "Nenhuma.\n\n";

  } else {

    faltas.forEach(falta => {

      const adm =
        falta.querySelector(".falta-adm")?.value || "-";

      const motivo =
        falta.querySelector(".falta-motivo")?.value || "-";

      const vezes =
        falta.querySelector(".falta-vezes")?.value || "-";

      const advertencia =
        falta.querySelector(".falta-advertencia")?.value || "-";

      mensagem +=
          `🔖 *ADM*: ${adm}
          ⁉️ O que aconteceu?
          ${motivo}
          ⚠️ Nº de vezes:
          ${vezes}
          🛑 Aplicou advertência?: ${advertencia}
          
          `;

    });

  }

  mensagem += "*Obs*:\n";
  mensagem += observacoes || "-";

  await navigator.clipboard.writeText(mensagem);

  alert("Mensagem copiada para a área de transferência!");

  // Abre o WhatsApp Web já com a mensagem
  window.open(
    `https://wa.me/?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}
