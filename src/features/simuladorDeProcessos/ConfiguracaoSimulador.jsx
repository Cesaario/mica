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
  useTheme,
} from "@material-ui/core";
import { entradas, saidas } from "../../shared/util/util";
import { configPadrao } from "../../shared/util/util";

const useStyles = makeStyles(({ palette }) => {
  return {
    botaoConfig: {
      backgroundColor: palette.primary.main,
      color: palette.grey[50],
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
  };
});

const ConfiguracaoSimulador = ({ setConfiguracaoSimulador }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [statusModal, setStatusModal] = useState(false);
  const [configuracoes, setConfiguracoes] = useState(configPadrao);

  const handleConfigChange = (tipo, valor) => {
    let valorTratado = valor;
    if (["escala", "passo", "tempoAlvo"].includes(tipo)) {
      valorTratado = Number(valor);
    }
    const novaConfiguracao = { ...configuracoes };
    novaConfiguracao[tipo] = valorTratado;

    setConfiguracaoSimulador(novaConfiguracao);
    setConfiguracoes(novaConfiguracao);
  };

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
                value={configuracoes.entrada}
                onChange={(event) =>
                  handleConfigChange("entrada", event.target.value)
                }
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
                value={configuracoes.saida}
                onChange={(event) =>
                  handleConfigChange("saida", event.target.value)
                }
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
                value={configuracoes.escala}
                onChange={(event) =>
                  handleConfigChange("escala", event.target.value)
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label="Passo de tempo"
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 1 }}
                className={classes.input}
                value={configuracoes.dt}
                onChange={(event) =>
                  handleConfigChange("dt", event.target.value)
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label="Tempo alvo"
                type="number"
                inputProps={{ step: 0.1, min: 0.1, max: 1 }}
                className={classes.input}
                value={configuracoes.tempoAlvo}
                onChange={(event) =>
                  handleConfigChange("tempoAlvo", event.target.value)
                }
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
