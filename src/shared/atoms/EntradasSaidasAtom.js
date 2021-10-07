import { atom } from "recoil";

const entradasSaidas = atom({
  key: "entradasSaidas",
  default: {
    saidaAnalogica: {
      s0: 0,
      s1: 0,
    }
  }
})

export default entradasSaidas;