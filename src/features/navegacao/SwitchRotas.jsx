import React from "react";
import { Switch, Route } from "react-router-dom";
import SimuladorDeProcessos from "../simuladorDeProcessos/SimuladorDeProcessos";

const SwitchRotas = () => {
  return (
    <Switch>
      <Route path="/simulador">
        <SimuladorDeProcessos />
      </Route>
    </Switch>
  );
}

export default SwitchRotas;