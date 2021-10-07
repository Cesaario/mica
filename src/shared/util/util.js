export const SAIDA_ANALOGICA = "SA";

export const entradas = [
  "E0", "E1", "E2", "E3"
]

export const saidas = [
  "S0", "S1"
]

export const funcaoPadrao = { num: [1], den: [1, 1] };

export const configPadrao = {
  entrada: "E0",
  saida: "S0",
  escala: 1,
  dt: 0.1,
  tempoAlvo: 10,
};

export const calcularCorEntradaSaidaExterna = (valor) => {
  return "hsl(122," + Math.floor(37 * valor) + "%,49%)";
};