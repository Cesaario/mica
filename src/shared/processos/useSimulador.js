import { useState, useEffect, useRef } from "react";

const PERIODO_RELOGIO = 50; //50ms

const useSimulador = (socket, enabled, parametrosIniciais, parametrosCalculo, desligar) => {
  const [estadoInicial, setEstadoInicial] = useState(null);
  const [dados, setDados] = useState({});
  const [tendencias, setTendencias] = useState({
    t_tend: [0],
    u_tend: [0],
    y_tend: [0],
  });

  const intervalo = useRef();

  const parametrosRef = useRef({ tempoAtual: 0 });

  const { A, B, C } = estadoInicial || {};
  const { t_tend, u_tend, y_tend } = tendencias || {};
  const { num, den } = parametrosIniciais;
  const { entrada, tempoAlvo, escala, dt } = parametrosCalculo;
  const { x0 } = dados;

  const calculosIniciais = () => {
    socket.emit("valoresIniciais", JSON.stringify(num), JSON.stringify(den));
    socket.on("respostaValoresIniciais", (resposta) => {
      setEstadoInicial({
        A: JSON.parse(resposta.A),
        B: JSON.parse(resposta.B),
        C: JSON.parse(resposta.C),
      });
      setDados({
        x0: JSON.parse(resposta.x0),
      })
    })
  }

  const calculoODE = () => {
    const { entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend } = parametrosRef.current;
    socket.emit("calculoODE", entrada, tempoAtual, escala, A, B, C, x0, t_tend, u_tend, y_tend);
    console.log("calculandoooooooooooo")
  }

  const iniciarRelogio = () => {
    const relogio = setInterval(() => {
      const { tempoAtual } = parametrosRef.current;
      if (tempoAtual < tempoAlvo) {
        calculoODE();
        parametrosRef.current.tempoAtual += dt;
      } else {
        desligar();
      }
    }, PERIODO_RELOGIO);
    intervalo.current = relogio;
  }

  useEffect(() => {
    parametrosRef.current = { ...parametrosRef.current, entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend };
  }, [entrada, tempoAlvo, escala, A, B, C, x0, t_tend, u_tend, y_tend]);

  useEffect(() => {
    if (!enabled) {
      setTendencias({
        t_tend: [0],
        u_tend: [0],
        y_tend: [0],
      });
      setEstadoInicial(null);
      setDados({});

      parametrosRef.current = { tempoAtual: 0 };

      clearInterval(intervalo.current);
      intervalo.current = null;

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

  useEffect(() => {
    if (!socket)
      return;
    socket.on("respostaODE", (resposta) => {
      setTendencias({
        y_tend: JSON.parse(resposta.y_tend),
        u_tend: JSON.parse(resposta.u_tend),
        t_tend: JSON.parse(resposta.t_tend),
      });
      setDados({ x0: JSON.parse(resposta.x0) })
      console.log("Calculando: ", parametrosRef.current.tempoAtual);
    });
  }, [socket]);

  return [1];
};

export default useSimulador;
