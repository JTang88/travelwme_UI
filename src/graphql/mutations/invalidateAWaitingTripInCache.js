import gql from 'graphql-tag';
import query from '../queries/getWaitingTrips';

export const invalidateAWaitingTripInCache = gql`
    mutation invalidateAWaitingTripInCache($userId: Int!, $tripId: Int!) {
      invalidateAWaitingTripInCache(userId: $userId, tripId: $tripId) @client
    }`;

export const invalidateAWaitingTripInCacheResolver = { 
  invalidateAWaitingTripInCache: async (_, { userId, tripId }, { cache }) => {
    const data = await cache.readQuery({ query, variables: { id: userId } });
    const deletedIdValues = [];
    for (let i = 0; i < data.getWaitingTrips.length; i++) {
      if (data.getWaitingTrips[i].id < 0) {
        deletedIdValues.push(data.getWaitingTrips[i].id);
      }
    }
    const min = Math.min(...deletedIdValues);
    for (let i = 0; i < data.getWaitingTrips.length; i++) {
      if (data.getWaitingTrips[i].id === tripId) {
        data.getWaitingTrips[i].id = deletedIdValues.length > 0 ? min - 1 : -1;
      }
      break;
    }
    cache.writeQuery({ query, variables: { id: userId }, data });
  },
};

