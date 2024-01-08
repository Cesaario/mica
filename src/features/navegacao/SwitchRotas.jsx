import React from "react";
import { Routes, Route } from "react-router-dom";
import SimuladorDeProcessos from "../simuladorDeProcessos/SimuladorDeProcessos";
import Osciloscopio from "../osciloscopio/Osciloscopio";
import Home from "../home/Home";

const SwitchRotas = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="simulador" element={<SimuladorDeProcessos />} />
      <Route path="osciloscopio" element={<Osciloscopio />} />
    </Routes>
  );
};

export default SwitchRotas;
