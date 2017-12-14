import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import MyTrips from './MyTrips';
import PendingTrips from './PendingTrips';
import TripInfo from './TripInfo';
import TripGroup from './TripGroup';
// import userTrips from '../../../actions/index';


function Trips() {
  return (
    <div>
      <Switch>
        <Route path="/homepage/trips/mytrips" component={MyTrips} />
        <Route path="/homepage/trips/pending" component={PendingTrips} />
        <Route path="/homepage/trips/tripinfo" component={TripInfo} />
        <Route path="/homepage/trips/tripgroup" component={TripGroup} />
      </Switch>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     trips: state.trips,
//   };
// }

export default Trips;

// mytrip component and add trending trip component routing to trip info
// Trips = graphql(query)(Trips);
