import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../TripList';
import TripListHeader from '../../../TripListHeader';
import CountTripsAndForSureGoings from '../../../../../services/CountTripsAndForSureGoings';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import getJoinedTrips from '../../../../../graphql/queries/getJoinedTrips';

const Joined = ({
  getJoinedTripsQuery: {
    loading,
    getJoinedTrips,
  },
  location: {
    pathname,
  },
}) => {
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trips You Joined"
      >
        {
          `• ${CountTripsAndForSureGoings(getJoinedTrips).tripsCount} 
          trips you have joined
          • ${CountTripsAndForSureGoings(getJoinedTrips).forSureGoings} 
          total for sure going travelers`
        }
      </TripListHeader>
      <TripList
        trips={getJoinedTrips}
        from={pathname}
      />
    </div>
  );
};

const WrapedJoined = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(getJoinedTrips, {
    name: 'getJoinedTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Joined);

export default WrapedJoined;