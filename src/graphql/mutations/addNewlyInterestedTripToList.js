import gql from 'graphql-tag';
import showTrendTrips from '../queries/showTrendTrips';
import getWaitingTrips from '../queries/getWaitingTrips';

export const addNewlyInterestedTripToList = gql`
  mutation addNewlyInterestedTripToList($userId: Int!, $tripId: Int!, $source: String!) {
    addNewlyInterestedTripToList(userId: $userId, tripId: $tripId, source: $source) @client
  }`;

export const addNewlyInterestedTripToListResolver = { 
  addNewlyInterestedTripToList: (_, { userId, tripId, source }, { cache }) => {
    const query = source === 'trend' ? showTrendTrips : ''; 
    const sourceData = cache.readQuery({ query, variables: { id: userId } });

    try {
      const data = cache.readQuery({ query: getWaitingTrips, variables: { id: userId } });
      let targetData = '';
      for (let i = 0; i < sourceData.showTrendTrips.length; i++) {
        if (sourceData.showTrendTrips[i].id === tripId) {
          targetData = Object.assign(sourceData.showTrendTrips[i]);
          break;
        }
      }
      data.getWaitingTrips.push(targetData);
      cache.writeQuery({ query: getWaitingTrips, variables: { id: userId }, data });
    } catch (err) {
      // leave empty on purpose
    }
  },
};

// import gql from 'graphql-tag';
// import showTrendTrips from '../queries/showTrendTrips';
// import { getWaitingTrips } from '../queries/getWaitingTrips';

// export const addNewlyInterestedTripToList = gql`
//   mutation addNewlyInterestedTripToList($userId: Int!, $tripId: Int!, $source: String!) {
//     addNewlyInterestedTripToList(userId: $userId, tripId: $tripId, source: $source) @client
//   }`;

// export const addNewlyInterestedTripToListResolver = { 
//   addNewlyInterestedTripToList: (_, { userId, tripId, source }, { cache }) => {
//     const query = source === 'trend' ? showTrendTrips : ''; 
//     const sourceData = cache.readQuery({ query, variables: { id: userId } });
//     const data = cache.readQuery({ query: getWaitingTrips, variables: { id: userId } });
//     let targetData = '';
//     for (let i = 0; i < sourceData.showTrendTrips.length; i++) {
//       if (sourceData.showTrendTrips[i].id === tripId) {
//         targetData = Object.assign(sourceData.showTrendTrips[i]);
//         break;
//       }
//     }
//     data.getWaitingTrips.push(targetData);
//     cache.writeQuery({ query: getWaitingTrips, variables: { id: userId }, data });
//   },
// };