import gql from 'graphql-tag';

export const deleteAMemberFromCache = gql`
    mutation deleteAMemberFromCache($targetMemberId: Int!, $tripId: Int!) {
      deleteAMemberFromCache(targetMemberId: $targetMemberId, tripId: $tripId) @client
    }`;

export const deleteAMemberFromCacheResolver = { 
  deleteAMemberFromCache: async (_, { targetMemberId }, { cache }) => {
    const id = `TripMembers:${targetMemberId}`;
    const fragment = gql`
      fragment targetMember on TripMembers {
        user_type
      }
    `;
    const current = cache.readFragment({ fragment, id });
    const data = { ...current, user_type: 'D' };
    cache.writeFragment({ fragment, id, data });
  },
};
