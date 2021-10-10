import { useEffect } from "react";
import useSocket from "../socket/useSocket";
import { useRecoilState } from "recoil";
import EntradasSaidasAtom from "../atoms/EntradasSaidasAtom";

const useLeituraEntradas = () => {
  const [conectado, socket] = useSocket();
  const [, setEntradasSaidas] = useRecoilState(EntradasSaidasAtom);

  const handleEntradas = (entradas) => {
    setEntradasSaidas((atual) => {
      return {
        ...atual, entradaAnalogica: {
          e0: entradas[0],
          e1: entradas[1],
          e2: entradas[2],
          e3: entradas[3],
        }
      }
    })
  }

  useEffect(() => {
    if (!conectado)
      return;
    socket.on("resultadoLeituraDados", (entradas) => {
      handleEntradas(entradas);
    })
    setInterval(() => {
      socket.emit("pedirLeituraEntradas");
    }, 100)
  }, [conectado])

  return [conectado];
}

export default useLeituraEntradas;