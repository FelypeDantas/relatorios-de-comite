/* =========================================================
   📄 PDF MODULE
========================================================= */

export async function gerarPDF({
  filename,
  dados,
}) {
  if (typeof window.html2pdf === "undefined") {
    alert("html2pdf não encontrado.");
    return;
  }

  const container = criarContainerPDF();

  container.innerHTML =
    gerarRelatorioHTML(dados);

  document.body.appendChild(container);

  try {
    await html2pdf()
      .from(container)
      .set({
        margin: 10,

        filename,

        html2canvas: {
          scale: 2,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .save();
  } catch (error) {
    console.error(error);

    alert("Erro ao gerar PDF.");
  } finally {
    container.remove();
  }
}

/* =========================================================
   🧱 CONTAINER
========================================================= */

function criarContainerPDF() {
  const container =
    document.createElement("div");

  Object.assign(container.style, {
    background: "#fff",
    padding: "40px",
    width: "794px",
  });

  return container;
}

/* =========================================================
   📄 TEMPLATE
========================================================= */

function gerarRelatorioHTML({
  mes,
  ano,
  meta,
  observacoes,
  semanas,
  faltas,
}) {
  return `
    <div style="font-family:Arial;color:#111;">
      ${sectionTitulo(
        "🩸 Relatório Mensal"
      )}

      <p>Comitê de Atendimento</p>

      <hr />

      ${sectionTitulo(
        "Informações Gerais",
        "h2"
      )}

      ${info("Mês", mes)}
      ${info("Ano", ano)}
      ${info("Meta", meta)}

      ${semanasHTML(semanas)}

      ${faltasHTML(faltas)}

      <div style="margin-top:30px;">
        ${sectionTitulo(
          "📝 Observações",
          "h2"
        )}

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
   🧩 SECTIONS
========================================================= */

function semanasHTML(semanas) {
  return semanas
    .map(
      (semana, index) => `
        <div style="margin-top:30px;">
          ${sectionTitulo(
            `${index + 1}ª Semana`,
            "h2"
          )}

          ${semana
            .map(
              (registro) => `
                ${cardHTML([
                  info(
                    "ADM",
                    registro.adm
                  ),
                  info(
                    "Contribuição",
                    registro.contribuicao
                  ),
                  info(
                    "Prazo",
                    registro.prazo
                  ),
                ])}
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");
}

function faltasHTML(faltas) {
  return `
    <div style="margin-top:30px;">
      ${sectionTitulo(
        "⚠️ Faltas",
        "h2"
      )}

      ${faltas
        .map(
          (falta) => `
            ${cardHTML([
              info(
                "ADM",
                falta.adm
              ),
              info(
                "Ocorrido",
                falta.ocorrido
              ),
              info(
                "Quantidade",
                falta.quantidade
              ),
              info(
                "Advertência",
                falta.advertencia
              ),
            ])}
          `
        )
        .join("")}
    </div>
  `;
}

/* =========================================================
   🎨 COMPONENTS
========================================================= */

function sectionTitulo(
  texto,
  tag = "h1"
) {
  return `<${tag}>${texto}</${tag}>`;
}

function info(label, value) {
  return `
    <p>
      <strong>${label}:</strong>
      ${value || "-"}
    </p>
  `;
}

function cardHTML(content) {
  return `
    <div
      style="
        border:1px solid #ccc;
        padding:12px;
        margin-top:10px;
        border-radius:10px;
      "
    >
      ${content.join("")}
    </div>
  `;
}