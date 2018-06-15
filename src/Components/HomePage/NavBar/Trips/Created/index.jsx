import React from 'react';
import { graphql, compose } from 'react-apollo';
import TripList from '../../../TripList';
import TripListHeader from '../../../TripListHeader';
import CountTripsAndForSureGoings from '../../../../../services/CountTripsAndForSureGoings';
import { getCurrentUser } from '../../../../../graphql/queries/getCurrentUser';
import getCreatedTrips from '../../../../../graphql/queries/getCreatedTrips';

const Created = ({
  getCreatedTripsQuery: {
    loading,
    getCreatedTrips,
  },
  location: {
    pathname,
  },
}) => {
  return loading ? '' : (
    <div>
      <TripListHeader
        title="Trips You Created"
      >
        {
          `• ${CountTripsAndForSureGoings(getCreatedTrips).tripsCount} 
          trips have created
          • ${CountTripsAndForSureGoings(getCreatedTrips).forSureGoings} 
          total for sure going travelers`
        }
      </TripListHeader>
      <TripList
        trips={getCreatedTrips}
        from={pathname}
      />
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
