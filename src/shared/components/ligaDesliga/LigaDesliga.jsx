import { Paper, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  botaoLiga: {
    backgroundColor: "#43a047",
    color: "#fff",
    width: 100,
    margin: 20
  },
  botaoDesliga: {
    backgroundColor: "#e53935",
    color: "#fff",
    width: 100,
    margin: 20
  },
  paper: {
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const LigaDesliga = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Button variant="contained" className={classes.botaoLiga}>
        Ligar
      </Button>
      <Button variant="contained" className={classes.botaoDesliga}>
        Desligar
      </Button>
    </Paper>
  )
}

export default LigaDesliga;