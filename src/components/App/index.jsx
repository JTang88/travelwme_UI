import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
// import decode from 'jwt-decode';
// import Auth from '../Auth';
import HomePage from '../HomePage';
import Landing from '../LandingPage';
import Login from '../Auth/Login';

const checkAuth = () => {
  // const token = localStorage.getItem('token');
  // const refreshToekn = localStorage.getItem('refreshToken');
  // if (!token || refreshToekn) {
  //   return false;
  // }
  // try {
  //   const { exp } = decode(refreshToekn);
  //   if (exp < new Date().getTime() / 1000) {
  //     return false;
  //   }
  // } catch (e) {
  //   return false;
  // }
  // return true;
  const token = localStorage.getItem('token');

  if (token === null) {
    return false;
  }
  return true;
};


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/landing' }} />
    )
  )}
  />
);

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/landing" component={Landing} />
          <AuthRoute path="/homepage" component={HomePage} />
        </Switch>
      </BrowserRouter >
    </div>
  );
}

export default App;
