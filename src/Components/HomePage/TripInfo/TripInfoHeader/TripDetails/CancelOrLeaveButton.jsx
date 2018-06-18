import React from 'react';
import { graphql, compose } from 'react-apollo';
import Button from './conditionButton';
import updateTripStatus from '../../../../../graphql/mutations/updateTripStatus';
import deleteAUserFromTrip from '../../../../../graphql/mutations/deleteAUserFromTrip';
import { deleteAMemberFromCache } from '../../../../../graphql/mutations/deleteAMemberFromCache';
import { invalidateATripInCache } from '../../../../../graphql/mutations/invalidateATripInCache';
import updateTripStat from '../../../../../graphql/mutations/updateTripStat';

const CancelOrLeaveButton = ({ 
  tripType, 
  memberId,
  tripId,
  userId,
  children,
  deleteAUserFromTripMutation,
  deleteAMemberFromCacheMutation,
  invalidateATripInCacheMutation,
  updateTripStatMutation,
}) => {
  const handleCancelRequestAndLeaveTrip = (e) =>  {
    const targetField = tripType === 'joined' ? 'joiners' : 'interesters';
    e.preventDefault();
    deleteAUserFromTripMutation({
      variables: {
        memberId,
      },
    });
    deleteAMemberFromCacheMutation({
      variables: {
        targetMemberId: memberId,
        tripId,
      },
    });
    invalidateATripInCacheMutation({
      variables: {
        userId,
        tripId,
        tripType,
      },
    });
    updateTripStatMutation({
      variables: {
        tripId,
        field: targetField,
        type: 'dec',
      },
    });
  };

  return ( 
    <Button onClick={handleCancelRequestAndLeaveTrip}>
      {children}
    </Button>
  );
};

const WrappedCancelOrLeaveButton = compose(
  graphql(updateTripStatus, { name: 'updateTripStatusMutation'}),
  graphql(deleteAUserFromTrip, { name: 'deleteAUserFromTripMutation' }),
  graphql(deleteAMemberFromCache, { name: 'deleteAMemberFromCacheMutation' }),
  graphql(invalidateATripInCache, { name: 'invalidateATripInCacheMutation' }),
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),
)(CancelOrLeaveButton);

export default WrappedCancelOrLeaveButton;