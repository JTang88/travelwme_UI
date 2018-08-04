import React from 'react';
import { graphql } from 'react-apollo';
import Button from './conditionButton'
import updateTripStatus from '../../../../../graphql/mutations/updateTripStatus';

const TripStatusButton = ({ id, currentStatus, mutate }) => {
  const handleCloseAndOpenThisTrip = (e) => {
    const trip_status = currentStatus === 'open' ? 'close' : 'open';
    e.preventDefault();
    mutate({
      variables: {
        id,
        trip_status,
      },
    });
  };

  return (
    <Button onClick={handleCloseAndOpenThisTrip}>
      {
        currentStatus === 'open' ? 'Close This Trip' : 'Open this Trip'
      }
    </Button>
  );
};

const WrappedTripStatusButton = graphql(updateTripStatus)(TripStatusButton);

export default WrappedTripStatusButton;