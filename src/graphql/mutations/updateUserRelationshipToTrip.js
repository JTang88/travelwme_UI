import gql from 'graphql-tag';

const updateUserRelationshipToTrip = gql`
mutation updateUserRelationshipToTrip($userId: Int!, $senderName: String!, $tripTitle: String!, $tripId: Int!, $user_type: String!) {
  updateUserRelationshipToTrip(userId: $userId, senderName: $senderName, tripTitle: $tripTitle, tripId: $tripId, user_type: $user_type) {
    id
    user {
      id
      publicId
      username
      birthday
      gender
      relationship
    }
    user_type
    updatedAt
  }
}
`;

export default updateUserRelationshipToTrip;

