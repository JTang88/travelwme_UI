
import gql from 'graphql-tag';

const interestedInATrip = gql`
mutation interestedInATrip($userId: Int!, $tripId: Int!) {
  interestedInATrip(userId: $userId, tripId: $tripId) {
    id
    user {
      id
      publicId
      username
      age
      gender
      relationship
    }
    forSureGoing
    user_type
    updatedAt
  }
}
`;

export default interestedInATrip;

