import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../TripList';
import TripListHeader from '../../../TripListHeader';
import CountTripsAndForSureGoings from '../../../../../services/CountTripsAndForSureGoings';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import getForSureGoingTrips from '../../../../../graphql/queries/getForSureGoingTrips';

const Going = ({
  getForSureGoingTripsQuery: {
    loading,
    getForSureGoingTrips,
  },
  location: {
    pathname,
  },
}) => {
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trips You are for Sure Going"
      >
        {
          `• ${CountTripsAndForSureGoings(getForSureGoingTrips).tripsCount} 
          trips you are for Sure Going
          • ${CountTripsAndForSureGoings(getForSureGoingTrips).forSureGoings} 
          total for sure going travelers`
        }
      </TripListHeader>
      <TripList
        trips={getForSureGoingTrips}
        from={pathname}
      />
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