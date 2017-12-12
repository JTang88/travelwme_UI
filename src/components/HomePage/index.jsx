import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MyTrip from './MyTrip/index';
import NavBar from './NavBar';
import PlanTrip from './PlanTrip';
import SearchTrip from './SearchTrip';
import Profile from './Profile';
import TrendTrips from './TrendTrips';

const query = gql`{
  allUsers {
    id,
    username
  }
}
`;

function HomePage(props) {
  console.log('p', props.data.allUsers);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/homepage" component={TrendTrips} />
        <Route path="/homepage/plantrip" component={PlanTrip} />
        <Route path="/homepage/searchtrip" component={SearchTrip} />
        <Route path="/homepage/mytrip" component={MyTrip} />
        <Route path="/homepage/profile" component={Profile} />
      </Switch>
    </div>
  );
}

// HomePage = graphql(query)(HomePage);
export default graphql(query)(HomePage);
