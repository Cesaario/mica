import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    height: "100%",
  },
});

const Grafico = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div>Grafico</div>
    </Paper>
  );
};

export default Grafico;
