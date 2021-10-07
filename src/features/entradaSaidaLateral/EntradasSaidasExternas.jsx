import { makeStyles } from "@material-ui/core";
import SaidaAnalogica from "./SaidaAnalogica";

const styles = makeStyles({
  container: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
  },
});

const EntradasSaidasExternas = () => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <SaidaAnalogica></SaidaAnalogica>
    </div>
  );
};

export default EntradasSaidasExternas;
