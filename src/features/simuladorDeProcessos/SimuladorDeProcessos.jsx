import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import CardFuncao from "../../shared/components/cardFuncao/CardFuncao";
import LigaDesliga from "../../shared/components/ligaDesliga/LigaDesliga";
import Grafico from "../../shared/components/grafico/Grafico";
import ConfiguracaoSimulador from "./ConfiguracaoSimulador";
import useSocket from "../../shared/socket/useSocket";
import useSimulador from "../../shared/processos/useSimulador";
import { funcaoPadrao, configPadrao } from "../../shared/util/util";

const useStyles = makeStyles({
  gridSimulador: {
    padding: "5px 10px",
    width: "100%",
    height: "100%",
  },
  gridGrafico: {
    padding: "5px 10px",
  },
});

const SimuladorDeProcessos = () => {
  const classes = useStyles();

  const [connected, socket] = useSocket();
  const [ligado, setLigado] = useState(false);
  const [funcaoTransferencia, setFuncaoTransferencia] = useState(funcaoPadrao);
  const [configuracoes, setConfiguracoes] = useState(configPadrao);

  const { tempoAlvo, escala, dt } = configuracoes;

  const entrada = 1;

  const [tendencias] = useSimulador(
    socket,
    ligado,
    funcaoTransferencia,
    { tempoAlvo: tempoAlvo * 1000, escala, dt: dt * 1000 },
    entrada,
    setLigado
  );

  useEffect(() => {
    console.log(tendencias);
  }, [tendencias])

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
        <Grid item xs={3}>
          <ConfiguracaoSimulador setConfiguracaoSimulador={setConfiguracoes} />
        </Grid>
        <Grid item xs={3}>
          <LigaDesliga setLigado={setLigado} />
        </Grid>
      </Grid>
      <Grid item className={classes.gridGrafico}>
        <Grafico />
      </Grid>
      <Grid>{connected ? "ONLINE" : "OFFLINE"}</Grid>
    </Grid>
  );
};

export default SimuladorDeProcessos;
