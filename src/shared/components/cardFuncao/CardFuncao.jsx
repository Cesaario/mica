import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  TextField,
  Grid,
} from "@material-ui/core";
import { BlockMath } from "react-katex";
import { gerarTf } from "./cardFuncaoUtil";
import "katex/dist/katex.min.css";
import "./CardFuncao.css";

const useStyles = makeStyles({
  paper: {
    padding: 1,
    cursor: "pointer",
    height: 90,
  },
});

const CardFuncao = () => {
  const classes = useStyles();

  const defaultTf = { num: [1], den: [1, 1] };

  const [funcao, setFuncao] = useState(defaultTf);
  const [inputFuncao, setInputFuncao] = useState(defaultTf);
  const [statusModalEdicao, setStatusModalEdicao] = useState(false);

  const handleSave = () => {
    const valorFuncao = inputFuncao;
  
    const num = valorFuncao.num.map(valor => Number(valor));
    const den = valorFuncao.den.map(valor => Number(valor));

    setFuncao({num, den});
    setStatusModalEdicao(false);
  };

  const aoDigitar = (event, tipo) => {
    const { value } = event.target;
    const valorFormatado = value.split(" ");
    if(tipo === "numerador"){
      setInputFuncao({...inputFuncao, num: valorFormatado});
    }else{
      setInputFuncao({...inputFuncao, den: valorFormatado});
    }
  };

  const textoNumerador = inputFuncao.num.join(" ");
  const textoDenominador = inputFuncao.den.join(" ");

  return (
    <Paper className={classes.paper}>
      <div onClick={() => setStatusModalEdicao(true)}>
        <BlockMath math={gerarTf(funcao)} errorColor={"#f00"} />
      </div>
      <Dialog
        open={statusModalEdicao}
        onClose={() => setStatusModalEdicao(false)}
      >
        <DialogTitle>{"Definir função de transferência"}</DialogTitle>
        <DialogActions>
          <Grid container direction="column" spacing={1} alignItems="stretch">
            <Grid item>
              <TextField
                fullWidth
                value={textoNumerador}
                onChange={(event) => aoDigitar(event, "numerador")}
                label="Numerador"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                value={textoDenominador}
                onChange={(event) => aoDigitar(event, "denominador")}
                label="Denominador"
              />
            </Grid>
            <Grid item container direction="row" spacing={1} justify="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setStatusModalEdicao(false)}
                >
                  Sair
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CardFuncao;
