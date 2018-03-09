import gql from 'graphql-tag';

const showTrendTrips = gql`
query showTrendTrips($id: Int!) {
  showTrendTrips(id: $id) {
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

export default showTrendTrips;