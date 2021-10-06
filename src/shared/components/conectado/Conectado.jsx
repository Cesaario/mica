import { Paper, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => {
  return {
    paper: {
      height: 90,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

const Conectado = (props) => {
  const classes = useStyles();

  const { conectado } = props;

  return (
    <Paper className={classes.paper}>
      <Typography
        style={{ fontWeight: "bold", color: conectado ? "#4caf50" : "#f44336" }}
      >
        {conectado ? "ONLINE" : "OFFLINE"}
      </Typography>
    </Paper>
  );
};

export default Conectado;
