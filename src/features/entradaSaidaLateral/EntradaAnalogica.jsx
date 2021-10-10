import { makeStyles } from "@material-ui/core";
import { calcularLarguraCorEntradaSaidaExterna } from "../../shared/util/util";

const styles = makeStyles({
  container: {
    position: "absolute",
    top: 230,
    left: 0,
  },
  io: {
    height: 48,
    width: 48,
    border: "1px solid #dddddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, #FFC0CB 50%, #00FFFF 50%)"
  },
});

const EntradaAnalogica = ({ e0, e1, e2, e3 }) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div
        className={classes.io}
        style={{ background: calcularLarguraCorEntradaSaidaExterna(e0) }}
      >
        E0
      </div>
      <div
        className={classes.io}
        style={{ background: calcularLarguraCorEntradaSaidaExterna(e1) }}
      >
        E1
      </div>
      <div
        className={classes.io}
        style={{ background: calcularLarguraCorEntradaSaidaExterna(e2) }}
      >
        E2
      </div>
      <div
        className={classes.io}
        style={{ background: calcularLarguraCorEntradaSaidaExterna(e3) }}
      >
        E3
      </div>
    </div>
  );
};

export default EntradaAnalogica;
