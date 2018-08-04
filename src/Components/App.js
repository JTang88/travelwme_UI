import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from './HomePage';
import Landing from './LandingPage';
import checkAuth from './../services/checkAuth';
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
          <Route exact path="/" component={Landing} />
          <AuthRoute path="/homepage" component={HomePage} redirectTo="/" />
        </Switch>
      </CssBaseline>
    </div>
  );
}

export default App;