/* =========================================================
   📄 PDF MODULE
========================================================= */

export async function gerarPDF({
  filename,
  dados,
}) {
  if (
    typeof window.html2pdf ===
    "undefined"
  ) {
    alert(
      "html2pdf não encontrado."
    );

    return;
  }

  const container =
    criarContainer();

  container.innerHTML =
    gerarHTML(dados);

  document.body.appendChild(
    container
  );

  try {
    /* =====================================================
       ⏳ Espera renderizar
    ===================================================== */

    await esperarRenderizacao();

    await html2pdf()
      .set({
        margin: 10,

        filename,

        image: {
          type: "jpeg",
          quality: 1,
        },

        html2canvas: {
          scale: 2,

          useCORS: true,

          logging: false,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation:
            "portrait",
        },
      })
      .from(container)
      .save();
  } catch (error) {
    console.error(error);

    alert(
      "Erro ao gerar PDF."
    );
  } finally {
    container.remove();
  }
}

/* =========================================================
   🧱 CONTAINER
========================================================= */

function criarContainer() {
  const container =
    document.createElement("div");

  Object.assign(container.style, {
    position: "fixed",
    top: "0",
    left: "0",

    width: "794px",

    padding: "40px",

    background: "#ffffff",

    color: "#111111",

    zIndex: "-1",

    opacity: "1",

    overflow: "hidden",
  });

  return container;
}

/* =========================================================
   ⏳ WAIT RENDER
========================================================= */

function esperarRenderizacao() {
  return new Promise(
    (resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(
          resolve
        );
      });
    }
  );
}

/* =========================================================
   📄 HTML
========================================================= */

function gerarHTML({
  mes,
  ano,
  meta,
  observacoes,
  semanas,
  faltas,
}) {
  return `
    <div
      style="
        font-family:Arial,sans-serif;
        color:#111;
      "
    >

      <style>
        h1{
          font-size:28px;
          margin-bottom:10px;
        }

        h2{
          font-size:20px;
          margin-bottom:10px;
        }

        p{
          margin:6px 0;
        }

        .pdf-section{
          margin-top:30px;
        }

        .pdf-card{
          border:1px solid #ccc;
          border-radius:10px;
          padding:12px;
          margin-top:10px;
        }
      </style>

      <h1>
        🩸 Relatório Mensal
      </h1>

      <p>
        Comitê de Atendimento
      </p>

      <hr />

      <div class="pdf-section">
        <h2>
          Informações Gerais
        </h2>

        ${info("Mês", mes)}
        ${info("Ano", ano)}
        ${info("Meta", meta)}
      </div>

      ${renderSemanas(semanas)}

      ${renderFaltas(faltas)}

      <div class="pdf-section">
        <h2>
          📝 Observações
        </h2>

        <p>
          ${
            observacoes ||
            "Nenhuma observação."
          }
        </p>
      </div>

    </div>
  `;
}

/* =========================================================
   📅 SEMANAS
========================================================= */

function renderSemanas(
  semanas
) {
  return semanas
    .map(
      (semana, index) => `
        <div class="pdf-section">

          <h2>
            ${index + 1}ª Semana
          </h2>

          ${semana
            .map(
              (registro) => `
                <div class="pdf-card">

                  ${info(
                    "ADM",
                    registro.adm
                  )}

                  ${info(
                    "Contribuição",
                    registro.contribuicao
                  )}

                  ${info(
                    "Prazo",
                    registro.prazo
                  )}

                </div>
              `
            )
            .join("")}

        </div>
      `
    )
    .join("");
}

/* =========================================================
   ⚠️ FALTAS
========================================================= */

function renderFaltas(
  faltas
) {
  return `
    <div class="pdf-section">

      <h2>
        ⚠️ Faltas
      </h2>

      ${faltas
        .map(
          (falta) => `
            <div class="pdf-card">

              ${info(
                "ADM",
                falta.adm
              )}

              ${info(
                "Ocorrido",
                falta.ocorrido
              )}

              ${info(
                "Quantidade",
                falta.quantidade
              )}

              ${info(
                "Advertência",
                falta.advertencia
              )}

            </div>
          `
        )
        .join("")}

    </div>
  `;
}

/* =========================================================
   🧠 HELPERS
========================================================= */

function info(
  label,
  value
) {
  return `
    <p>
      <strong>${label}:</strong>
      ${value || "-"}
    </p>
  `;
}
