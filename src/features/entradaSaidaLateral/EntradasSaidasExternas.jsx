import { makeStyles } from "@material-ui/core";
import SaidaAnalogica from "./SaidaAnalogica";
import EntradaAnalogica from "./EntradaAnalogica";
import { useRecoilValue } from "recoil";
import EntradasSaidasAtom from "../../shared/atoms/EntradasSaidasAtom";
import useLeituraEntradas from "../../shared/leituraEntradas/useLeituraEntradas";

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
  useLeituraEntradas();

  const { saidaAnalogica, entradaAnalogica } = entradasSaidas;

  return (
    <div className={classes.container}>
      <SaidaAnalogica s0={saidaAnalogica.s0} s1={saidaAnalogica.s1} />
      <EntradaAnalogica
        e0={entradaAnalogica.e0}
        e1={entradaAnalogica.e1}
        e2={entradaAnalogica.e2}
        e3={entradaAnalogica.e3}
      />
    </div>
  );
};

export default EntradasSaidasExternas;
