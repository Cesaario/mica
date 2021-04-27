import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import CardFuncao from "../../shared/components/cardFuncao/CardFuncao";
import LigaDesliga from "../../shared/components/ligaDesliga/LigaDesliga";
import Grafico from "../../shared/components/grafico/Grafico";
import ConfiguracaoSimulador from "./ConfiguracaoSimulador";
import useSocket from "../../shared/socket/useSocket";
import useSimulador from "../../shared/processos/useSimulador";

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

  const [connected, emit] = useSocket();
  const [data] = useSimulador(emit, true);

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
          <CardFuncao />
        </Grid>
        <Grid item xs={3}>
          <ConfiguracaoSimulador />
        </Grid>
        <Grid item xs={3}>
          <LigaDesliga />
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
