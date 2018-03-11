import gql from 'graphql-tag';

export const updateCurrentUserRelationToTrip = gql`
mutation updateCurrentUserRelationToTrip($id: String!, $user_type: String!) {
  updateCurrentUserRelationToTrip(id: $id, user_type: $user_type) @client
}
`;

export const updateCurrentUserRelationToTripResolver = {
  updateCurrentUserRelationToTrip: (_, { id, user_type }, { cache }) => {
    // console.log('this code break before fragment declaration');
    const fragment = gql`
      fragment currentMemberInCache on TripMembers {
        user_type
      }
    `;
    // console.log('this code break after fragment declaration');
    const result = cache.readFragment({ fragment, id });
    const data = { ...result, user_type };
  
    cache.writeFragment({ fragment, id, data });
    return null;
  },
};

