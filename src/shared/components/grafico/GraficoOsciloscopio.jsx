import { useEffect, useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SPAN = 300;

const useStyles = makeStyles({
  paper: {
    width: "100%",
    height: "100%",
  },
});

const GraficoOsciloscopio = ({ tendencias }) => {
  const classes = useStyles();

  const [tendenciasGrafico, setTendenciasGrafico] = useState([]);
  const [tempoAtual, setTempoAtual] = useState(0);

  useEffect(() => {
    let tendenciasFormatadas = [];
    let { x, e0, e1, e2, e3 } = { ...tendencias };
    /*if (x.length > SPAN) {
      const excedente = x.length - SPAN;
      x = x.splice(excedente);
      e0 = e0.splice(excedente);
      e1 = e1.splice(excedente);
      e2 = e2.splice(excedente);
      e3 = e3.splice(excedente);
    }*/
    x.forEach((e, i) => {
      tendenciasFormatadas.push({
        x: e,
        e0: e0[i],
        e1: e1[i],
        e2: e2[i],
        e3: e3[i],
      });
    });
    setTendenciasGrafico(tendenciasFormatadas);
    if (tendenciasFormatadas.length > 0)
      setTempoAtual(tendenciasFormatadas[tendenciasFormatadas.length - 1].x);
  }, [tendencias]);

  return (
    <Paper className={classes.paper} elevation={5}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={tendenciasGrafico}>
          <Line type="monotone" dataKey="e0" stroke="#f00" dot={false} />
          <Line type="monotone" dataKey="e1" stroke="#0f0" dot={false} />
          <Line type="monotone" dataKey="e2" stroke="#00f" dot={false} />
          <Line type="monotone" dataKey="e3" stroke="#f0f" dot={false} />
          <XAxis
            domain={
              tempoAtual > SPAN ? [tempoAtual - SPAN, tempoAtual] : [0, SPAN]
            }
            dataKey="x"
            type="number"
            scale="time"
            interval={10}
            allowDataOverflow={true}
            tickFormatter={(val) => val / 10}
            tickCount={30}
          />
          <YAxis
            domain={[0, 1.0]}
            type="number"
            tickFormatter={(number) => parseFloat(number).toFixed(2)}
          />
          <Legend verticalAlign="bottom" height={18} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GraficoOsciloscopio;
