import React from 'react';
import { graphql, compose } from 'react-apollo';
import forSureGoing from '../../../../graphql/mutations/forSureGoing';
import updateTripStat from '../../../../graphql/mutations/updateTripStat';
import { moveAJoinedTripToGoingList } from '../../../../graphql/mutations/moveAJoinedTripToGoingList';
import { invalidateATripInCache } from '../../../../graphql/mutations/invalidateATripInCache';

const ForSureGoinButton = ({
  memberId,
  tripId,
  userId,
  tripType,
  forSureGoingMutation,
  updateTripStatMutation,
  moveAJoinedTripToGoingListMutation,
  invalidateATripInCacheMutation,
}) => {
  const handleForSureGoing = async (e) => {
    e.preventDefault();
    forSureGoingMutation({
      variables: {
        memberId,
        tripId,
      },
    });
    updateTripStatMutation({
      variables: {
        tripId,
        field: 'forSureGoing',
        type: 'inc',
      },
    });
    await moveAJoinedTripToGoingListMutation({
      variables: {
        userId,
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
  };

  return (
    <button onClick={handleForSureGoing}>
      For Sure Going
    </button>
  );
};

const WrappedForSureGoingButton = compose(
  graphql(forSureGoing, { name: 'forSureGoingMutation' }),
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),
  graphql(moveAJoinedTripToGoingList, { name: 'moveAJoinedTripToGoingListMutation' }),
  graphql(invalidateATripInCache, { name: 'invalidateATripInCacheMutation' }),
)(ForSureGoinButton);

export default WrappedForSureGoingButton;
