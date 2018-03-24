import gql from 'graphql-tag';

const getForSureGoingTrips = gql`
query getForSureGoingTrips($id: Int!) {
  getForSureGoingTrips(id: $id) {
    id
    title
    date_start
    date_end
    cost
    interesters
    joiners
    forSureGoing
    countries
    continents
    creator {
      id
      publicId
      username
    }
  }
}`;

export default getForSureGoingTrips;