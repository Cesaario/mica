import { useState, useEffect, useRef } from "react";

const useSimulador = (socket, enabled, interval, parametrosIniciais, parametrosCalculo) => {
  const [estadoInicial, setEstadoInicial] = useState(null);
  const [dados, setDados] = useState();
  const [tendencias, setTendencias] = useState({
    t_tend: [0],
    u_tend: [0],
    y_tend: [0],
  });

  const intervalo = useRef();

  const { A, B, C, x0 } = estadoInicial || {};
  const { t_tend, u_tend, y_tend } = tendencias || {};
  const { num, den } = parametrosIniciais;
  const { entrada, tempoAlvo, escala } = parametrosCalculo;

  useEffect(() => {
    if (!socket)
      return;
    console.log("1s");
    if (!estadoInicial) {
      socket.emit("valoresIniciais", JSON.stringify(num), JSON.stringify(den));
      console.log(JSON.stringify(num), JSON.stringify(den));
      socket.on("respostaValoresIniciais", (resposta) => {
        console.log(resposta);
        setEstadoInicial({
          A: JSON.parse(resposta.A),
          B: JSON.parse(resposta.B),
          C: JSON.parse(resposta.C),
          x0: JSON.parse(resposta.x0),
        });
      })
    } else {
      const argumentosCalculo = [
        entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend
      ];
      console.log(argumentosCalculo);
      socket.emit("calculoODE", ...argumentosCalculo);
      socket.on("respostaODE", (resposta) => {
        console.log(resposta);
      })
    }
  }, [estadoInicial]);

  return [1];
};

export default useSimulador;
