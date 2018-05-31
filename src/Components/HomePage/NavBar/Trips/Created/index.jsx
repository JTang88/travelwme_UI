import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../TripList';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import getCreatedTrips from '../../../../../graphql/queries/getCreatedTrips';

const Created = (props) => {
  return (
    <div>
      <div>Trips I created</div>
      { 
        props.getCreatedTripsQuery.loading ? '' : 
        <TripList 
          trips={props.getCreatedTripsQuery.getCreatedTrips} 
          from={props.location.pathname}
        /> 
      }
    </div>
  );
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
