import { useState, useEffect, useRef } from "react";

const PERIODO_RELOGIO = 50; //50ms

const useSimulador = (socket, enabled, interval, parametrosIniciais, parametrosCalculo) => {
  const [estadoInicial, setEstadoInicial] = useState(null);
  const [dados, setDados] = useState();
  const [tendencias, setTendencias] = useState({
    t_tend: [0],
    u_tend: [0],
    y_tend: [0],
  });

  const intervalo = useRef();

  const parametrosRef = useRef({ tempoAtual: 0 });

  const { A, B, C, x0 } = estadoInicial || {};
  const { t_tend, u_tend, y_tend } = tendencias || {};
  const { num, den } = parametrosIniciais;
  const { entrada, tempoAlvo, escala, dt } = parametrosCalculo;
  
  const calculosIniciais = () => {
    socket.emit("valoresIniciais", JSON.stringify(num), JSON.stringify(den));
    socket.on("respostaValoresIniciais", (resposta) => {
      setEstadoInicial({
        A: JSON.parse(resposta.A),
        B: JSON.parse(resposta.B),
        C: JSON.parse(resposta.C),
        x0: JSON.parse(resposta.x0),
      });
    })
  }
  
  const calculoODE = () => {
    const { entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend } = parametrosRef.current;
    
    console.log("Enviado: ", { t_tend, escala });
    socket.emit("calculoODE", entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend);
  }
  
  const iniciarRelogio = () => {
    const relogio = setInterval(() => {
      const { tempoAtual } = parametrosRef.current;
      if (tempoAtual < tempoAlvo) {
        calculoODE();
        parametrosRef.current.tempoAtual += dt;
      }
    }, interval);
    intervalo.current = relogio;

    socket.on("respostaODE", (resposta) => {
      setTendencias({
        y_tend: JSON.parse(resposta.y_tend),
        u_tend: JSON.parse(resposta.u_tend),
        t_tend: JSON.parse(resposta.t_tend)
      });
      console.log("Recebido: ", resposta);
    })
  }

  useEffect(() => {
    parametrosRef.current = { ...parametrosRef.current, entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend };
  }, [entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend]);

  useEffect(() => {
    if (!enabled && Boolean(intervalo.current)) {
      clearInterval(intervalo.current);
      return;
    }
    if (!socket) {
      console.error("SOCKET NÃO INICIADO");
      return;
    }
    if (!estadoInicial) {
      console.log("CALCULANDO PARÂMETROS INICIAIS");
      calculosIniciais();
    } else if (!intervalo.current) {
      console.log("INICIANDO RELÓGIO");
      iniciarRelogio();
    }
  }, [estadoInicial, enabled]);

  return [1];
};

export default useSimulador;
