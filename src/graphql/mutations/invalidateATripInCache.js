import gql from 'graphql-tag';
import getWaitingTrips from '../queries/getWaitingTrips';
import getJoinedTrips from '../queries/getJoinedTrips';


export const invalidateATripInCache = gql`
    mutation invalidateATripInCache($userId: Int!, $tripId: Int!, $tripType: String!) {
      invalidateATripInCache(userId: $userId, tripId: $tripId, tripType: $tripType) @client
    }`;

export const invalidateATripInCacheResolver = { 
  invalidateATripInCache: async (_, { userId, tripId, tripType }, { cache }) => {
    const query = tripType === 'waiting' ? getWaitingTrips : getJoinedTrips;
    const queryName = tripType === 'waiting' ? 'getWaitingTrips' : 'getJoinedTrips';
    const data = await cache.readQuery({ query, variables: { id: userId } });
    for (let i = 0; i < data[queryName].length; i++) {
      if (data[queryName][i].id === tripId) {
        data[queryName][i].id = -1;
        break;
      }
    }
    cache.writeQuery({ query, variables: { id: userId }, data });
  },
};

// import gql from 'graphql-tag';
// import getWaitingTrips from '../queries/getWaitingTrips';
// import getJoinedTrips from '../queries/getJoinedTrips';


// export const invalidateATripInCache = gql`
//     mutation invalidateATripInCache($userId: Int!, $tripId: Int!, $tripType: String!) {
//       invalidateATripInCache(userId: $userId, tripId: $tripId, tripType: $tripType) @client
//     }`;

// export const invalidateATripInCacheResolver = { 
//   invalidateATripInCache: async (_, { userId, tripId, tripType }, { cache }) => {
//     const query = tripType === 'waiting' ? getWaitingTrips : getJoinedTrips;
//     const queryName = tripType === 'waiting' ? 'getWaitingTrips' : 'getJoinedTrips';
//     const data = await cache.readQuery({ query, variables: { id: userId } });
//     const deletedIdValues = [];
//     for (let i = 0; i < data[queryName].length; i++) {
//       if (data[queryName][i].id < 0) {  
//         deletedIdValues.push(data[queryName][i].id);
//       }
//     }
//     console.log('here is deletedIdValue: ', deletedIdValues);
//     const min = Math.min(...deletedIdValues);
//     console.log('here is min: ', min);
//     for (let i = 0; i < data[queryName].length; i++) {
//       console.log(data[queryName][i].id === tripId);
//       if (data[queryName][i].id === tripId) {
//         data[queryName][i].id = deletedIdValues.length >= 1 ? min - 1 : -1;
//         console.log('this is the new invalidated id', data[queryName][i].id);
//         break;
//       }
//     }
//     cache.writeQuery({ query, variables: { id: userId }, data });
//   },
// };

