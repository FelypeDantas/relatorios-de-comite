import {
  gerarPDFCompras
} from "./pdf-compras.js";

document
  .querySelector("#gerar-pdf")
  ?.addEventListener(
    "click",
    async () => {
      await gerarPDFCompras({
        mes:
          document.querySelector("#mes")
            .value,

        ano:
          document.querySelector("#ano")
            .value,

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
    }
  );
