import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  container: {
    position: "absolute",
    top: 275,
    right: 0
  },
  io: {
    height: 48,
    width: 48,
    border: "1px solid #dddddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const SaidaAnalogica = () => {

  const classes = styles();

  return <div className={classes.container}>
    <div className={classes.io}>S0</div>
    <div className={classes.io}>S1</div>
  </div>;
};

export default SaidaAnalogica;
