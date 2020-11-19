import React from "react";
import { Switch, Route } from "react-router-dom";
import SimuladorDeProcessos from "../simuladorDeProcessos/SimuladorDeProcessos";

const SwitchRotas: React.FC = () => {
  return (
    <Switch>
      <Route path="/simulador">
        <SimuladorDeProcessos />
      </Route>
    </Switch>
  );
}

export default SwitchRotas;