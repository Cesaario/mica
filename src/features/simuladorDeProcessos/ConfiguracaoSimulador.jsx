import { useState } from "react";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
  TextField,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { entradas, saidas } from "../../shared/util/util";

const useStyles = makeStyles({
  botaoConfig: {
    backgroundColor: "#3949ab",
    color: "#fff",
    width: 150,
    margin: 20,
  },
  paper: {
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  dialogo: {
    width: 300,
    margin: 10,
  },
});

const ConfiguracaoSimulador = () => {
  const classes = useStyles();

  const [statusModal, setStatusModal] = useState(false);

  return (
    <Paper className={classes.paper}>
      <Button
        variant="contained"
        className={classes.botaoConfig}
        onClick={() => setStatusModal(true)}
      >
        Configurações
      </Button>
      <Dialog open={statusModal} onClose={() => setStatusModal(false)}>
        <DialogTitle>{"Configurações"}</DialogTitle>
        <DialogActions className={classes.dialogo}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                select
                label="Entrada"
                className={classes.input}
                defaultValue={entradas[0]}
              >
                {entradas.map((entrada) => {
                  return (
                    <MenuItem key={entrada} value={entrada}>
                      {entrada}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                select
                label="Saida"
                className={classes.input}
                defaultValue={saidas[0]}
              >
                {saidas.map((saida) => {
                  return (
                    <MenuItem key={saida} value={saida}>
                      {saida}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                label="Escala de tempo"
                type="number"
                inputProps={{ step: 0.5, min: 1, max: 5 }}
                className={classes.input}
                defaultValue={1}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Passo de tempo"
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 1 }}
                className={classes.input}
                defaultValue={0.1}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => setStatusModal(false)} color="primary">
                Fechar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ConfiguracaoSimulador;
