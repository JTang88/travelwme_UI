import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import Landing from '../LandingPage';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import checkAuth from '../../services/checkAuth';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    checkAuth() ?
      <Component {...props} />
    :
      <Redirect to={{ pathname: rest.redirectTo }} />
    )
  }
  />
);

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign" component={Signup} />
        <Route exact path="/" component={Landing} />
        <AuthRoute path="/homepage" component={HomePage} redirectTo="/login" />
      </Switch>
    </div>
  );
}

export default App;
