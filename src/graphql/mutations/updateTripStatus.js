import gql from 'graphql-tag';

const updateTripStatus = gql`
mutation updateTripStatus($id: Int!, $trip_status: String!) {
  updateTripStatus(id: $id, trip_status: $trip_status) {
    id
    trip_status
  } 
}
`;

export default updateTripStatus;