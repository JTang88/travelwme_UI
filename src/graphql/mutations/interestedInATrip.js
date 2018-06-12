
import gql from 'graphql-tag';

const interestedInATrip = gql`
mutation interestedInATrip($userId: Int!, $tripId: Int!, $senderName: String!, $creatorId: Int!, $tripTitle: String!) {
  interestedInATrip(userId: $userId, tripId: $tripId, senderName: $senderName, creatorId: $creatorId, tripTitle: $tripTitle) {
    id
    user {
      id
      publicId
      username
      birthday
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
