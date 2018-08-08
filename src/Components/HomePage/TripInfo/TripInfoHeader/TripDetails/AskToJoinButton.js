import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getCurrentSearchTerms } from '../../../../../graphql/queries/getCurrentSearchTerms';
import interestedInATrip from '../../../../../graphql/mutations/interestedInATrip';
import { addNewlyInterestedTripToList } from '../../../../../graphql/mutations/addNewlyInterestedTripToList';
import { addFoundTripToList } from '../../../../../graphql/mutations/addFoundTripToList';
import updateTripStat from '../../../../../graphql/mutations/updateTripStat';
import getTrip from '../../../../../graphql/queries/getTrip';
import Button from './conditionButton';

const AskToJoinButton = ({
  senderName, 
  creatorId,
  tripTitle,
  userId,
  tripId,
  tripType,
  getCurrentSearchTermsQuery: {
    getCurrentSearchTerms
  },
  interestedInATripMutation,
  addNewlyInterestedTripToListMutation,
  addFoundTripToListMutation,
  updateTripStatMutation,
}) => {

  const handleAskToJoin = (e) => {
    e.preventDefault();
    interestedInATripMutation({
      variables: {
        senderName,
        creatorId,
        tripTitle,
        userId,
        tripId,
      },
      update: (proxy, { data: { interestedInATrip } }) => {
        const data = proxy.readQuery({ query: getTrip, variables: { id: tripId } });
        data.getTrip.members.push(interestedInATrip);
        proxy.writeQuery({ query: getTrip, variables: { id: tripId }, data });
      },
    });

    if (tripType === 'trend' || 'joined') {
      addNewlyInterestedTripToListMutation({
        variables: {
          userId,
          tripId,
        },
      });
    } else {
      addFoundTripToListMutation({
        variables: {
          getCurrentSearchTerms,
          tripId,
        },
      });
    }

    updateTripStatMutation({
      variables: {
        tripId,
        field: 'interesters',
        type: 'inc',
      },
    });
  }

  return (
    <Button variant="contained" color="inherit" onClick={handleAskToJoin}>
      Ask To Join
    </Button>
  );
};

const WrappedAskToJoinButton = compose(
  graphql(getCurrentSearchTerms, { name: 'getCurrentSearchTermsQuery' }),
  graphql(interestedInATrip, { name: 'interestedInATripMutation' }), 
  graphql(addNewlyInterestedTripToList, { name: 'addNewlyInterestedTripToListMutation' }), 
  graphql(addFoundTripToList, { name: 'addFoundTripToListMutation' }), 
  graphql(updateTripStat, { name: 'updateTripStatMutation' }),  
)(AskToJoinButton);

export default WrappedAskToJoinButton;
