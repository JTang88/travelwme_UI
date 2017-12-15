import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import HomePage from '../HomePage';
import Landing from '../LandingPage';


const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    checkAuth() ?
      <Component {...props} />
    :
      <Redirect to={{ pathname: '/landing' }} />
    )
  }
  />
);

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/landing" component={Landing} />
        <AuthRoute exact path="/" component={HomePage} />
        <AuthRoute path="/homepage" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;


// Below method works..

// const checkAuth = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return false;
//   }
//   try {
//     const { exp } = decode(token);
//     if (exp < new Date().getTime() / 1000) {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }
//   return true;
// };


// const AuthRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (
//     checkAuth() ?
//       <Component {...props} />
//     :
//       <Redirect to={{ pathname: '/landing' }} />
//     )
//   }
//   />
// );

// function App() {
//   return (
//     <div className="app">
//       <Switch>
//         <Route path="/landing" component={Landing} />
//         <AuthRoute path="/" component={HomePage} />
//       </Switch>
//     </div>
//   );
// }

// export default App;
