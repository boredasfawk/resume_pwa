//DEPS
import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

// COMPONENTS
import LandingPage from './Views/LandingPage/LandingPage'
import AppBar from '@Components/Hero/Nav/AppBar';
import Error from '@Components/Hero/Error/Error';

// Styles
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Error} />
        </Switch>
      </Container>
    </>
  );
};

// helps perserve state on each reload in dev
export default hot(module)(App);
