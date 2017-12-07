import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// import Auth from '../Auth';
import Homepage from '../Homepage';
// import Landing from '../LandingPage';

function App() {
  return (
    <div className="app">
      <Switch>
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/homepage" component={Homepage} />
        {/* <Route path="/landing" component={Landing} /> */}
      </Switch>
    </div>
  );
};

export default App;
