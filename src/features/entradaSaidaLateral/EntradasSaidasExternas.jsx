import { makeStyles } from "@material-ui/core";
import SaidaAnalogica from "./SaidaAnalogica";
import { useRecoilValue } from "recoil";
import EntradasSaidasAtom from "../../shared/atoms/EntradasSaidasAtom";

const styles = makeStyles({
  container: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
  },
});

const EntradasSaidasExternas = () => {
  const classes = styles();

  const entradasSaidas = useRecoilValue(EntradasSaidasAtom);

  const { saidaAnalogica } = entradasSaidas;

  return (
    <div className={classes.container}>
      <SaidaAnalogica
        s0={saidaAnalogica.s0}
        s1={saidaAnalogica.s1}
      ></SaidaAnalogica>
    </div>
  );
};

export default EntradasSaidasExternas;
