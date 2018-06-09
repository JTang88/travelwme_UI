import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './HomePage';
import Landing from './LandingPage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import checkAuth from './../services/checkAuth';
import ForgotPassowrd from './Auth/ForgotPassword';
import 'typeface-roboto'

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
      <CssBaseline>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/forgot" component={ForgotPassowrd} />
          <Route path="/sign" component={Signup} />
          <Route exact path="/" component={Landing} />
          <Route path="/login/forgot" component={Login} />
          <AuthRoute path="/homepage" component={HomePage} redirectTo="/login" />
        </Switch>
      </CssBaseline>
    </div>
  );
}

export default App;