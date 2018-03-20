import gql from 'graphql-tag';
import { pick } from 'lodash'; 
import query from '../queries/searchTrips';
import getWaitingTrips from '../queries/getWaitingTrips';

export const addFoundTripToList = gql`
  mutation addFoundTripToList(
    $userId: Int!, 
    $tripId: Int!,
    $cost_start: Int!,
    $cost_end: Int!
    $date_start: String!
    $date_end: String!
    $keys: String!
  ) {
    addFoundTripToList(
      userId: $userId, 
      tripId: $tripId,
      cost_start: $cost_start,
      cost_end: $cost_end,
      date_start: $date_start,
      date_end: $date_end,
      keys: $keys
    ) @client
  }`;

export const addFoundTripToListResolver = { 
  addFoundTripToList: (_, args, { cache }) => {
    const variables = pick(args, ['userId', 'cost_start', 'cost_end', 'date_start', 'date_end', 'keys']);
    const sourceData = cache.readQuery({ query, variables });

    try {
      const data = cache.readQuery({ query: getWaitingTrips, variables: { id: args.userId } });
      let targetData = '';
      for (let i = 0; i < sourceData.searchTrips.length; i++) {
        if (sourceData.searchTrips[i].id === args.tripId) {
          targetData = Object.assign(sourceData.searchTrips[i]);
          break;
        }
      }
      data.getWaitingTrips.push(targetData);
      cache.writeQuery({ query: getWaitingTrips, variables: { id: args.userId }, data });
    } catch (err) {
      // leave empty on purpose
    }
  },
};