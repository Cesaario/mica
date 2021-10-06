import { Paper, makeStyles } from "@material-ui/core";
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    height: "100%",
  },
});

const Grafico = ({ tendencias, tempoAlvo }) => {
  const classes = useStyles();

  const formatarTendencias = () => {
    console.log(tendencias);
    const tendenciasFormatadas = [];
    tendencias.t_tend.forEach((tend, index) => {
      if (index > 0) {
        //Para ignorar o primeiro 0 da lista
        tendenciasFormatadas.push({
          x: tend,
          y: tendencias.y_tend[index],
          u: tendencias.u_tend[index],
        });
      }
    });
    return tendenciasFormatadas;
  };

  return (
    <Paper className={classes.paper}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatarTendencias()}>
          <Line type="monotone" dataKey="y" stroke="#f00" />
          <Line type="monotone" dataKey="u" stroke="#0ff" />
          <XAxis
            domain={[0, tempoAlvo]}
            dataKey="x"
            type="number"
            scale="time"
            interval={tempoAlvo - 1}
          />
          <YAxis
            domain={[0, 2]}
            type="number"
            tickFormatter={(number) => parseFloat(number).toFixed(2)}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Grafico;
