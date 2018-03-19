import gql from 'graphql-tag';
import query from '../queries/getJoinedTrips';
import getForSureGoingTrips from '../queries/getForSureGoingTrips';

export const moveAJoinedTripToGoingList = gql`
  mutation moveAJoinedTripToGoingList($userId: Int!, $tripId: Int!) {
    moveAJoinedTripToGoingList(userId: $userId, tripId: $tripId) @client
  }`;

export const moveAJoinedTripToGoingListResolver = { 
  moveAJoinedTripToGoingList: (_, { userId, tripId }, { cache }) => {
    try {
      const sourceData = cache.readQuery({ query, variables: { id: userId } });
      const data = cache.readQuery({ query: getForSureGoingTrips, variables: { id: userId } });
      let targetData = '';
      for (let i = 0; i < sourceData.getJoinedTrips.length; i++) {
        if (sourceData.getJoinedTrips[i].id === tripId) {
          targetData = Object.assign(sourceData.getJoinedTrips[i]);
          break;
        }
      }
      console.log('this is sourceData: ', sourceData);
      data.getForSureGoingTrips.push(targetData);
      cache.writeQuery({ query: getForSureGoingTrips, variables: { id: userId }, data });
    } catch (err) {
      // leave empty on purpose
    }
  },
};