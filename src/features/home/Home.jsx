import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    height: "100%"
  },
});

const Home = () => {
  const classes = useStyles();

  return <div className={classes.container}>
    <Typography variant="h1">MICAsh</Typography>
  </div>;
};

export default Home;
