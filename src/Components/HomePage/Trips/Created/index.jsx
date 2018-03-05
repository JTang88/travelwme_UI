import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../Global/Recipes/TripList';
import getCurrentUser from '../../../../graphql/queries/getCurrentUser';
import getCreatedTrips from '../../../../graphql/queries/getCreatedTrips';

const Created = (props) => {
  console.log('this is props in Created', props);
  return (
    <div>
      <div>Trips I created</div>
      { props.getCreatedTripsQuery.loading ? '' : <TripList trips={props.getCreatedTripsQuery.getCreatedTrips} /> }
    </div>
  )
};

const WrapedCreated = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getCreatedTrips, {
    name: 'getCreatedTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Created);

export default WrapedCreated;
