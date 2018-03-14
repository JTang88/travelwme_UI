import gql from 'graphql-tag';

const updateUserRelationshipToTrip = gql`
mutation updateUserRelationshipToTrip($userId: Int!, $tripId: Int!, $user_type: String!) {
  updateUserRelationshipToTrip(userId: $userId tripId: $tripId, user_type: $user_type) {
    id
    user {
      id
      publicId
      username
      age
      gender
      relationship
    }
    user_type
    updatedAt
  }
}
`;

export default updateUserRelationshipToTrip;
