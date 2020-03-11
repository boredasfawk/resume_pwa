
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// TODO:
// import * as serviceWorker from './serviceWorker'

// For lazy loading
import LoadableApp from "./LazyLoad/LoadableApp";
import { UserProvider } from "./Context/Context";
// Style Library
import './assets/css/index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Themes/theme';

const rootId = document.getElementById("root");

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LoadableApp />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </>
  , rootId);

// for hot reload (HMR) to work in dev server 
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./LazyLoad/LoadableApp", () => {
    const NextApp = require("./LazyLoad/LoadableApp").default;
    ReactDOM.render(<NextApp />, rootId);
  });
}
// TODO: optomize service worker file the switch to register for prod
// serviceWorker.unregister();