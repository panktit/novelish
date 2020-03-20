import React from 'react';
import './assets/scss/App.scss';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

import Login from "./components/Login";
import Signup from "./components/Signup";
import AllReviews from "./components/AllReviews";
import UserReviews from "./components/UserReviews";
import Create from "./components/Create";
import Show from "./components/Show";
import Edit from "./components/Edit";
import NotFound from "./components/NotFound";

function App(props) {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' render={props => <Signup {...props} />}/>
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/allreviews/:id" render={props => <AllReviews {...props} />} />
        <Route path='/myreviews/:id' render={props => <UserReviews {...props} />}  />
        <Route path='/create/:id' render={props => <Create {...props} />}  />
        <Route path='/show/:id' render={props => <Show {...props} />}  />
        <Route path='/edit/:id' render={props => <Edit {...props} />}  />
        {/* <Route path='/edit/:id' component={Edit} />
        <Route path='/show/:id' component={Show} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
