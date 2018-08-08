import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../TripList';
import CountTripsAndForSureGoings from '../../../../../services/CountTripsAndForSureGoings';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import TripListHeader from '../../../TripListHeader';
import getWaitingTrips from '../../../../../graphql/queries/getWaitingTrips';

const Waiting = ({ 
  getWaitingTripsQuery: { 
    loading, 
    getWaitingTrips, 
  }, 
  location: { 
    pathname, 
  }, 
}) => {
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trips You are Waiting for Response on"
      >
        {
          `• ${CountTripsAndForSureGoings(getWaitingTrips).tripsCount} 
          trips you are currently waiting for
          • ${CountTripsAndForSureGoings(getWaitingTrips).forSureGoings} 
          total for sure going travelers`
        } 
      </TripListHeader>
      <TripList
        trips={getWaitingTrips}
        from={pathname}
      />
    </div>
  );
};

const WrapedWaiting = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(getWaitingTrips, {
    name: 'getWaitingTripsQuery',
    options: props => ({ variables: { id: props.getCurrentUserQuery.getCurrentUser.id } }),
  }),
)(Waiting);

export default WrapedWaiting;