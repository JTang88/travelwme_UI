import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import showTrendTrips from '../../graphql/queries/showTrendTrips';
import { getCurrentUser } from '../../graphql/queries/getCurrentUser';
import TripList from '../Global/Recipes/TripList';

const TrendTrips = props => (
  <div>
    <div>Trending Trips</div>
    { props.showTrendTripsQuery.loading ? '' : <TripList trips={props.showTrendTripsQuery.showTrendTrips} /> }
  </div>
);

const TrendTripWithQuery = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(showTrendTrips, {
    name: 'showTrendTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(TrendTrips);

const TrendTripWithClient = withApollo(TrendTripWithQuery);

export default TrendTripWithClient;