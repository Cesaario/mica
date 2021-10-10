import { makeStyles } from "@material-ui/core";
import { calcularLarguraCorEntradaSaidaExterna } from "../../shared/util/util"

const styles = makeStyles({
  container: {
    position: "absolute",
    top: 275,
    right: 0,
  },
  io: {
    height: 48,
    width: 48,
    border: "1px solid #dddddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SaidaAnalogica = ({ s0, s1 }) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.io} style={{ background: calcularLarguraCorEntradaSaidaExterna(s0) }}>
        S0
      </div>
      <div className={classes.io} style={{ background: calcularLarguraCorEntradaSaidaExterna(s1) }}>
        S1
      </div>
    </div>
  );
};

export default SaidaAnalogica;
