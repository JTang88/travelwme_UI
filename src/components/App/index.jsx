import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from '../Auth';
import Homepage from '../Homepage';
import Landing from '../LandingPage';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/landing" component={Landing} />
      </Switch>
    </div>
  );
};

export default App;
