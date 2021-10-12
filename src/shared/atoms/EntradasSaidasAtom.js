import { atom } from "recoil";

const entradasSaidas = atom({
  key: "entradasSaidas",
  default: {
    saidaAnalogica: {
      s0: 0,
      s1: 0,
    },
    entradaAnalogica: {
      e0: 0,
      e1: 0,
      e2: 0,
      e3: 0,
    }
  }
})

export default entradasSaidas;