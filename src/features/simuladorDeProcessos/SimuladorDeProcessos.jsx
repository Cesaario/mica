import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import CardFuncao from "../../shared/components/cardFuncao/CardFuncao";
import LigaDesliga from "../../shared/components/ligaDesliga/LigaDesliga";
import GraficoSimuladorProcessos from "../../shared/components/grafico/GraficoSimuladorProcessos";
import ConfiguracaoSimulador from "./ConfiguracaoSimulador";
import useSocket from "../../shared/socket/useSocket";
import useSimulador from "../../shared/processos/useSimulador";
import {
  funcaoPadrao,
  configPadrao,
  SAIDA_ANALOGICA,
} from "../../shared/util/util";
import Conectado from "../../shared/components/conectado/Conectado";
import { useRecoilState } from "recoil";
import EntradasSaidasAtom from "../../shared/atoms/EntradasSaidasAtom";

const useStyles = makeStyles({
  gridSimulador: {
    padding: "5px 10px",
    width: "100%",
    height: "100%",
  },
  gridGrafico: {
    padding: "5px 60px",
    height: 450,
  },
});

const SimuladorDeProcessos = () => {
  const classes = useStyles();

  const [connected, socket] = useSocket();
  const [ligado, setLigado] = useState(false);
  const [funcaoTransferencia, setFuncaoTransferencia] = useState(funcaoPadrao);
  const [configuracoes, setConfiguracoes] = useState(configPadrao);
  
  const { tempoAlvo, escala, dt } = configuracoes;

  const [entradasSaidas, setEntradasSaidas] =
    useRecoilState(EntradasSaidasAtom);

  const entrada = entradasSaidas.entradaAnalogica[configuracoes.entrada.toLowerCase()];

  const [tendencias] = useSimulador(
    socket,
    ligado,
    funcaoTransferencia,
    { tempoAlvo: tempoAlvo * 1000, escala, dt: dt * 1000 },
    entrada,
    setLigado
  );

  const atualizarValorSaida = (valor, saidaSelecionada) => {
    setEntradasSaidas({
      ...entradasSaidas,
      saidaAnalogica: {
        ...entradasSaidas.saidaAnalogica,
        [saidaSelecionada]: valor,
      },
    });
  };

  useEffect(() => {
    const valorSaida = tendencias.y_tend[tendencias.y_tend.length - 1];
    const saidaSelecionada = configuracoes.saida.toLowerCase();
    atualizarValorSaida(valorSaida, saidaSelecionada);
    if (connected)
      socket.emit(
        "escreverSaida",
        saidaSelecionada,
        SAIDA_ANALOGICA,
        valorSaida
      );
  }, [tendencias.y_tend]);

  return (
    <Grid container direction="column">
      <Grid
        container
        item
        spacing={1}
        className={classes.gridSimulador}
        alignItems="center"
        justify="flex-start"
      >
        <Grid item xs={6}>
          <CardFuncao setFuncaoSimulador={setFuncaoTransferencia} />
        </Grid>
        <Grid item xs={2}>
          <ConfiguracaoSimulador setConfiguracaoSimulador={setConfiguracoes} />
        </Grid>
        <Grid item xs={3}>
          <LigaDesliga setLigado={setLigado} />
        </Grid>
        <Grid item xs={1}>
          <Conectado conectado={connected} />
        </Grid>
      </Grid>
      <Grid item className={classes.gridGrafico}>
        <GraficoSimuladorProcessos tendencias={tendencias} tempoAlvo={tempoAlvo} />
      </Grid>
    </Grid>
  );
};

export default SimuladorDeProcessos;
