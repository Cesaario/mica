import { useState, useEffect, useRef } from "react";

const useSimulador = ({ emit, enabled, interval }) => {

  const [estadoInicial, setEstadoInicial] = useState(null);
  const [dados, setDados] = useState();

  const intervalo = useRef();

  useEffect(() => {
    emit()
  }, [estadoInicial]);

}

export default useSimulador;