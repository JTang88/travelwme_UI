import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import showTrendTrips from '../../graphql/queries/showTrendTrips';
import { getCurrentUser } from '../../graphql/queries/getCurrentUser';
import TripListHeader from './TripListHeader';
import CountTripsAndForSureGoings from '../../services/CountTripsAndForSureGoings';
import TripList from './TripList';

const TrendTrips = ({
  showTrendTripsQuery: {
    loading,
    showTrendTrips,
  },
  location: {
    pathname,
  }
}) => { 
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trending Now"
      >
        {
          `• ${CountTripsAndForSureGoings(showTrendTrips).tripsCount} 
          trips are currently trending
          • ${CountTripsAndForSureGoings(showTrendTrips).forSureGoings} 
          total for sure going travelers` 
        }
      </TripListHeader>
      <TripList
        trips={showTrendTrips}
        from={pathname}
      />
    </div>
  );
};

const TrendTripWithQuery = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(showTrendTrips, {
    name: 'showTrendTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(TrendTrips);

const TrendTripWithClient = withApollo(TrendTripWithQuery);

export default TrendTripWithClient;