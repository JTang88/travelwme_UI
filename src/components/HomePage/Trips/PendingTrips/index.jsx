import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import userTrips from '../../../../actions/userTripsAction';
import myTrip from '../../../../actions/myTripAction';
//convert to stateful component
const pendTrips = gql`
query queryTrips($id: Int!) {
  getUser(id: $id) {
    id
    username
    trips {
      id
      title
      date_start
      date_end
      gender
      age
      fitness
      relationship_status
      trip_state
    }
  }
}
`;


function PendingTrips(props) {

  if (!props.data.loading) {
    props.userTrips(props.data.getUser.trips);
  }

  return (
    <div>
      <h1>Pending Trips</h1>
      <div>
        {props.trips.map(trip =>
          (<div key={trip.id}>
            <h3 onClick={() => props.myTrip(trip)}>
              <Link to="/homepage/trips/tripinfo" href="/homepage/trips/tripinfo" className="nav-item nav-link">
                {trip.title}
              </Link>
            </h3>
          </div>))}
      </div>
      <button onClick={() => console.log(props)}>
            button
      </button>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    trips: state.trips,
    mytrip: state.mytrip,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ userTrips, myTrip }, dispatch);
}

PendingTrips = graphql(pendTrips)(PendingTrips);

export default connect(mapStateToProps, matchDispatchToProps)(PendingTrips);

