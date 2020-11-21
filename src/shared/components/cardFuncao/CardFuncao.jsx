import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { BlockMath } from 'react-katex';
import { gerarTf } from "./cardFuncaoUtil";
import 'katex/dist/katex.min.css';
import './CardFuncao.css';

const useStyles = makeStyles({
  paper: {
    padding: 1,
  },
});

const CardFuncao = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <BlockMath
        math={gerarTf()}
        errorColor={'#f00'}
      />
    </Paper>
  );
}

export default CardFuncao;