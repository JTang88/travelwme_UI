import gql from 'graphql-tag';

const getCreatedTrips = gql`
query getCreatedTrips($id: Int!) {
  getCreatedTrips(id: $id) {
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

export default getCreatedTrips;