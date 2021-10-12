import { Paper, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => {
  return {
    botaoLiga: {
      backgroundColor: palette.success.main,
      color: palette.grey[50],
      width: 100,
      margin: 20,
    },
    botaoDesliga: {
      backgroundColor: palette.error.main,
      color: palette.grey[50],
      width: 100,
      margin: 20,
    },
    paper: {
      height: 90,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

const LigaDesliga = (props) => {
  const classes = useStyles();

  const { setLigado } = props;

  return (
    <Paper className={classes.paper}>
      <Button
        variant="contained"
        className={classes.botaoLiga}
        onClick={() => setLigado(true)}
      >
        Ligar
      </Button>
      <Button
        variant="contained"
        className={classes.botaoDesliga}
        onClick={() => setLigado(false)}
      >
        Desligar
      </Button>
    </Paper>
  );
};

export default LigaDesliga;
