import gql from 'graphql-tag';

const getWaitingTrips = gql`
query getWaitingTrips($id: Int!) {
  getWaitingTrips(id: $id) {
    id
    title
    date_start
    date_end
    cost
    interesters
    joiners
    forSureGoing
    creator {
      id
      publicId
      username
    }
  }
}`;

export default getWaitingTrips;
