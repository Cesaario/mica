import React, { useState } from 'react';
import { Paper, Tabs, Tab, AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

const AbaRotas: React.FC = () => {

  const [aba, setAba] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<{}>, value: any) => {
    setAba(value);
  }

  return (

    <AppBar position="sticky">
      <Paper square>
        <Tabs
          value={aba}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Simulador de Processos" to="/simulador" component={Link}/>
          <Tab label="Osciloscópio" to="/osciloscopio" component={Link} />
          <Tab label="Teste" disabled />
        </Tabs>
      </Paper>
    </AppBar>
  );
}

export default AbaRotas;