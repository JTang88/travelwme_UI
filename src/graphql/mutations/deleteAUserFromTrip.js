import gql from 'graphql-tag';

const deleteAUserFromTrip = gql`
mutation deleteAUserFromTrip($userId: Int!, $tripId: Int!) {
  deleteAUserFromTrip(userId: $userId, tripId: $tripId) 
}
`;

export default deleteAUserFromTrip;