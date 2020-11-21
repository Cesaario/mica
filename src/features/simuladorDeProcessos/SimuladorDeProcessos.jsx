import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import CardFuncao from "../../shared/components/cardFuncao/CardFuncao";
import LigaDesliga from "../../shared/components/ligaDesliga/LigaDesliga";
import Grafico from "../../shared/components/grafico/Grafico";
import ConfiguracaoSimulador from "./ConfiguracaoSimulador";

const useStyles = makeStyles({
  gridSimulador: {
    padding: "5px 10px",
    width: "100%",
    height: "100%",
  },
});

const SimuladorDeProcessos = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={1}
      className={classes.gridSimulador}
      align="center"
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
      <Grid item xs={12}>
        <Grafico />
      </Grid>
    </Grid>
  );
};

export default SimuladorDeProcessos;
