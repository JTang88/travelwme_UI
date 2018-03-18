import gql from 'graphql-tag';

const updateTripStat = gql`
mutation ($tripId: Int!, $field: String!, $type: String!) {
  updateTripStat(tripId: $tripId, field: $field, type: $type) {
    id
    interesters
    joiners
    forSureGoing
  } 
}
`;

export default updateTripStat;