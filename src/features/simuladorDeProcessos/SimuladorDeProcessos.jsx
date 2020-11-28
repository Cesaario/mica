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
  gridGrafico: {
    padding: "5px 10px",
  }
});

const SimuladorDeProcessos = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid
        container
        item
        spacing={1}
        className={classes.gridSimulador}
        align="center"
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
    </Grid>
  );
};

export default SimuladorDeProcessos;
