import React from "react";
import { Switch, Route } from "react-router-dom";
import SimuladorDeProcessos from "../simuladorDeProcessos/SimuladorDeProcessos";
import Home from "../home/Home";

const SwitchRotas = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/simulador">
        <SimuladorDeProcessos />
      </Route>
    </Switch>
  );
};

export default SwitchRotas;
