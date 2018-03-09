import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../Global/Recipes/TripList';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import getWaitingTrips from '../../../../graphql/queries/getWaitingTrips';

const Waiting = (props) => {
  return (
    <div>
      <div>Trips I Waiting</div>
      { props.getWaitingTripsQuery.loading ? '' : <TripList trips={props.getWaitingTripsQuery.getWaitingTrips} /> }
    </div>
  );
};

const WrapedWaiting = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getWaitingTrips, {
    name: 'getWaitingTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Waiting);

export default WrapedWaiting;