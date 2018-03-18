import gql from 'graphql-tag';

const forSureGoing = gql`
mutation forSureGoing($memberId: Int!, $tripId: Int!) {
  forSureGoing(memberId: $memberId, tripId: $tripId) {
    id
    forSureGoing
  } 
}
`;

export default forSureGoing;