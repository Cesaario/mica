import { useState, useEffect, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import EntradasSaidasAtom from "../../shared/atoms/EntradasSaidasAtom";
import { useRecoilValue } from "recoil";
import LigaDesliga from "../../shared/components/ligaDesliga/LigaDesliga";
import Conectado from "../../shared/components/conectado/Conectado";
import useLeituraEntradas from "../../shared/leituraEntradas/useLeituraEntradas";
import GraficoOsciloscopio from "../../shared/components/grafico/GraficoOsciloscopio";

const useStyles = makeStyles({
  gridOsciloscopio: {
    padding: "5px 10px",
    width: "100%",
    height: "100%",
  },
  gridGrafico: {
    padding: "5px 60px",
    height: 450,
  },
});

const Osciloscopio = () => {
  const entradasSaidas = useRecoilValue(EntradasSaidasAtom);
  const [conectado] = useLeituraEntradas();
  const [ligado, setLigado] = useState(false);
  
  const contadorTempo = useRef(0);
  const intervalo = useRef();
  const parametrosRef = useRef({ tempoAtual: 0 });
  const entradasRef = useRef({});
  const tendencias = useRef({
    x: [],
    e0: [],
    e1: [],
    e2: [],
    e3: [],
  });

  useEffect(() => {
    entradasRef.current = entradasSaidas.entradaAnalogica;
  }, [entradasSaidas.entradaAnalogica]);

  const atualizarTendencias = () => {
    if (!ligado) return;
    const { e0, e1, e2, e3 } = entradasRef.current;
    tendencias.current = {
      x: [...tendencias.current.x, contadorTempo.current++],
      e0: [...tendencias.current.e0, e0],
      e1: [...tendencias.current.e1, e1],
      e2: [...tendencias.current.e2, e2],
      e3: [...tendencias.current.e3, e3],
    }
  };

  const dt = 100;

  const iniciarRelogio = () => {
    const relogio = setInterval(atualizarTendencias, dt);
    intervalo.current = relogio;
  };

  useEffect(() => {
    if (ligado) {
      console.log("INICIAR");
      iniciarRelogio();
    } else {
      console.log("PARAR");
      parametrosRef.current = { tempoAtual: 0 };
      clearInterval(intervalo.current);
      intervalo.current = null;
    }
  }, [ligado]);

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid
        container
        item
        spacing={1}
        className={classes.gridOsciloscopio}
        alignItems="center"
        justify="flex-start"
      >
        <Grid item xs={6}>
          <LigaDesliga setLigado={setLigado} />
        </Grid>
        <Grid item xs={6}>
          <Conectado conectado={conectado} />
        </Grid>
      </Grid>
      <Grid item className={classes.gridGrafico}>
        <GraficoOsciloscopio tendencias={tendencias.current} />
      </Grid>
    </Grid>
  );
};

export default Osciloscopio;
