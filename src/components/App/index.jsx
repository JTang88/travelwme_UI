import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Auth from '../Auth';
import HomePage from '../HomePage';
import Landing from '../LandingPage';

function App() {
  return (
    <div className="app">
      <Switch>
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/homepage" component={HomePage} />
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
