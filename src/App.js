import React from 'react';
import './assets/scss/App.scss';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import history from "./components/history";

function App(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect from="/register" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
