import gql from 'graphql-tag';

const getJoinedTrips = gql`
query getJoinedTrips($id: Int!) {
  getJoinedTrips(id: $id) {
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

export default getJoinedTrips;