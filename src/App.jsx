import React from 'react';
import './App.scss';
import AbaRotas from './features/navegacao/AbaRotas';
import SwitchRotas from './features/navegacao/SwitchRotas';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AbaRotas />
        <SwitchRotas />
      </Router>
    </div>
  );
}

export default App;
