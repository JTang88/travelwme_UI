import gql from 'graphql-tag';

const getWaitingTrips = gql`
query getWaitingTrips($id: Int!) {
  getWaitingTrips(id: $id) {
    id
    title
    date_start
    date_end
    cost
    creator {
      id
      publicId
      username
    }
  }
}`;

export default getWaitingTrips;