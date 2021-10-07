import React from "react";
import AbaRotas from "./features/navegacao/AbaRotas";
import SwitchRotas from "./features/navegacao/SwitchRotas";
import Theme from "./shared/theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import EntradasSaidasExternas from "./features/entradaSaidaLateral/EntradasSaidasExternas";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <CssBaseline>
          <EntradasSaidasExternas />
          <Router>
            <AbaRotas />
            <SwitchRotas />
          </Router>
        </CssBaseline>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
