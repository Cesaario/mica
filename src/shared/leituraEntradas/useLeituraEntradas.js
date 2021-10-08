import { useEffect } from "react";
import useSocket from "../socket/useSocket";
import { useRecoilState } from "recoil";
import EntradasSaidasAtom from "../atoms/EntradasSaidasAtom";

const useLeituraEntradas = () => {
  const [conectado, socket] = useSocket();
  const [entradasSaidas, setEntradasSaidas] = useRecoilState(EntradasSaidasAtom);

  const handleEntradas = (entradas) => {
    setEntradasSaidas({
      ...entradasSaidas, entradaAnalogica: {
        e0: entradas[0],
        e1: entradas[1],
        e2: entradas[2],
        e3: entradas[3],
      }
    })
  }

  useEffect(() => {
    if (!conectado)
      return;
    socket.on("resultadoLeituraDados", (entradas) => {
      console.log(entradas);
      handleEntradas(entradas);
    })
    setInterval(() => {
      socket.emit("pedirLeituraEntradas");
    }, 100)
  }, [conectado])
}

export default useLeituraEntradas;