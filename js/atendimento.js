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

function createAdmCard() {

    const card = document.createElement("div");

    card.className =
        "adm-card metric-card animate-fade";

    const grid = document.createElement("div");

    grid.className =
        "grid grid-cols-1 lg:grid-cols-3 gap-6";

    const admField = createField({
        label: "ADM",
        input: createInput({
            placeholder: "Nome do ADM"
        })
    });

    admField.querySelector("input")
        .classList.add("adm-nome");

    const contribuicaoField = createField({
        label: "Contribuição",
        input: createInput({
            placeholder: "Descreva a contribuição"
        })
    });

    contribuicaoField.querySelector("input")
        .classList.add("adm-contribuicao");

    const prazoField = createField({
        label: "Prazo cumprido?",
        input: createSelect([
            "Selecione",
            "Sim",
            "Não"
        ])
    });

    prazoField.querySelector("select")
        .classList.add("adm-prazo");

    grid.append(
        admField,
        contribuicaoField,
        prazoField
    );

    card.appendChild(grid);

    const removeButton =
        document.createElement("button");

    removeButton.type = "button";

    removeButton.className =
        "mt-6 w-full bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 py-3 rounded-2xl transition-all";

    removeButton.textContent =
        "Remover ADM";

    removeButton.onclick = () => card.remove();

    card.appendChild(removeButton);

    return card;

}
