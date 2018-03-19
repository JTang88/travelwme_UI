import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../Global/Recipes/TripList';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import getForSureGoingTrips from '../../../../graphql/queries/getForSureGoingTrips';

const Going = (props) => {
  console.log('this is props in ForSureGoing', props);
  return (
    <div>
      <div>Trips I am For Sure Going</div>
      { props.getForSureGoingTripsQuery.loading ? '' : <TripList trips={props.getForSureGoingTripsQuery.getForSureGoingTrips} /> }
    </div>
  );
};

const WrapedGoing = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getForSureGoingTrips, {
    name: 'getForSureGoingTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Going);

export default WrapedGoing;