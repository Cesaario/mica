import React from 'react';
import AbaRotas from './features/navegacao/AbaRotas';
import SwitchRotas from './features/navegacao/SwitchRotas';
import Theme from "./shared/theme/theme";
import { ThemeProvider } from "@material-ui/core/styles"
import { makeStyles, CssBaseline } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  console.log(theme)
  return {
    app: {
      //backgroundColor: theme.background.default
    }
  };
})

function App() {

  const classes = useStyles(Theme);
  //console.log(Theme)

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline>
        <Router>
          <AbaRotas />
          <SwitchRotas />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
