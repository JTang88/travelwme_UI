import gql from 'graphql-tag';

const deleteAUserFromTrip = gql`
mutation deleteAUserFromTrip($memberId: Int!) {
  deleteAUserFromTrip(memberId: $memberId) 
}
`;

export default deleteAUserFromTrip;