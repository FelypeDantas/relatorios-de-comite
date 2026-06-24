/* =========================================================
   🎭 PDF • COMITÊ DE EVENTOS
========================================================= */

function getValue(id) {
  return document.querySelector(`#${id}`)?.value?.trim() || "";
}

function coletarEventos() {
  return [...document.querySelectorAll(".event-card")].map((card) => {
    const inputs = card.querySelectorAll("input");
    const textareas = card.querySelectorAll("textarea");

    return {
      nome: inputs[0]?.value || "",
      criador: inputs[1]?.value || "",
      dataProgramada: inputs[2]?.value || "",
      dataReal: inputs[3]?.value || "",
      vencedor: inputs[4]?.value || "",
      premio: inputs[5]?.value || "",
      contribuintes: textareas[0]?.value || "",
      adversidades: textareas[1]?.value || "",
    };
  });
}

function coletarFaltas() {
  const container =
    document.querySelector("#faltas-container");

  return [...container.children].map((card) => {
    const campos =
      card.querySelectorAll("input, select");

    return {
      membro: campos[0]?.value || "",
      ocorrido: campos[1]?.value || "",
      quantidade: campos[2]?.value || "",
      advertencia: campos[3]?.value || "",
    };
  });
}

function gerarHTMLRelatorio() {
  const mes = getValue("mes");
  const ano = getValue("ano");

  const resumo =
    getValue("resumo-geral");

  const observacoes =
    getValue("observacoes");

  const eventos =
    coletarEventos();

  const faltas =
    coletarFaltas();

  return `
    <div
      style="
        padding:40px;
        font-family:Arial,sans-serif;
        color:#111827;
        line-height:1.6;
      "
    >

      <h1
        style="
          margin:0;
          font-size:30px;
          color:#6d28d9;
        "
      >
        🌫️💬 Relatório Mensal
      </h1>

      <p
        style="
          margin-top:5px;
          color:#6b7280;
        "
      >
        Comitê de Eventos • Sangue Carmesim
      </p>

      <hr
        style="
          margin:20px 0;
        "
      >

      <h2>
        ♦️ Mês
      </h2>

      <p>
        <strong>${mes}</strong> / ${ano}
      </p>

      <h2>
        📇 Eventos realizados
      </h2>

      ${
        eventos.length
          ? eventos
              .map(
                (
                  evento,
                  index
                ) => `
            <div
              style="
                border:1px solid #e5e7eb;
                border-radius:12px;
                padding:20px;
                margin-bottom:20px;
              "
            >

              <h3>
                Evento ${index + 1}
              </h3>

              <p>
                <strong>Nome do evento:</strong>
                ${evento.nome}
              </p>

              <p>
                <strong>Informações adversas:</strong>
                ${evento.adversidades}
              </p>

              <p>
                <strong>Data programada:</strong>
                ${evento.dataProgramada}
              </p>

              <p>
                <strong>Data real:</strong>
                ${evento.dataReal}
              </p>

              <p>
                <strong>Quem deu a ideia?</strong>
                ${evento.criador}
              </p>

              <p>
                <strong>Contribuintes ativos:</strong>
                ${evento.contribuintes}
              </p>

              <p>
                <strong>Vencedor:</strong>
                ${evento.vencedor}
              </p>

              <p>
                <strong>Prêmio:</strong>
                ${evento.premio}
              </p>

            </div>
          `
              )
              .join("")
          : "<p>Nenhum evento registrado.</p>"
      }

      <h2>
        ♦️ Resumo Geral
      </h2>

      <p>
        ${
          resumo ||
          "Nenhum resumo informado."
        }
      </p>

      <h2>
        ♦️ Faltas Cometidas
      </h2>

      <div
        style="
          background:#f9fafb;
          padding:15px;
          border-radius:12px;
          margin-bottom:20px;
        "
      >
        <strong>Exemplos de faltas:</strong>

        <ul>
          <li>
            Não entregar o que foi pedido no prazo.
          </li>

          <li>
            Desrespeitar colegas do comitê.
          </li>
        </ul>
      </div>

      ${
        faltas.length
          ? faltas
              .map(
                (falta) => `
            <div
              style="
                border:1px solid #e5e7eb;
                border-radius:12px;
                padding:15px;
                margin-bottom:15px;
              "
            >

              <p>
                <strong>🔖 Membro em questão:</strong>
                ${falta.membro}
              </p>

              <p>
                <strong>⁉️ O que aconteceu?</strong>
                ${falta.ocorrido}
              </p>

              <p>
                <strong>⚠️ Nº de vezes:</strong>
                ${falta.quantidade}
              </p>

              <p>
                <strong>🛑 Aplicou advertência?</strong>
                ${falta.advertencia}
              </p>

            </div>
          `
              )
              .join("")
          : "<p>Nenhuma falta registrada.</p>"
      }

      <h2>
        📝 Observações finais
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

export async function gerarPDF({
  filename =
    "relatorio-comite-eventos.pdf",
} = {}) {
  if (
    typeof html2pdf ===
    "undefined"
  ) {
    throw new Error(
      "html2pdf não encontrado."
    );
  }

  const container =
    document.createElement("div");

  container.innerHTML =
    gerarHTMLRelatorio();

  await html2pdf()
    .set({
      margin: 0.5,

      filename,

      image: {
        type: "jpeg",
        quality: 1,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
      },

      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(container)
    .save();
}