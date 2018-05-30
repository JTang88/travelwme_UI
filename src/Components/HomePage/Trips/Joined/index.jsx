import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../Global/Recipes/TripList';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import getJoinedTrips from '../../../../graphql/queries/getJoinedTrips';

const Joined = (props) => {
  return (
    <div>
      <div>Trips I Joined</div>
      { 
        props.getJoinedTripsQuery.loading ? '' : 
        <TripList 
          trips={props.getJoinedTripsQuery.getJoinedTrips} 
          from={props.location.pathname}
        /> 
      }
    </div>
  );
};

const WrapedJoined = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getJoinedTrips, {
    name: 'getJoinedTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Joined);

export default WrapedJoined;