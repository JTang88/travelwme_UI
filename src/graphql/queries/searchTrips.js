import gql from 'graphql-tag';

const searchTrips = gql`
query searchTrips($userId: Int!, $cost_start: Int!, $cost_end: Int!, $date_start: String!, $date_end: String!, $keys: String!, $countries: String, $continents: String) {
  searchTrips(userId: $userId, cost_start: $cost_start, cost_end: $cost_end, date_start: $date_start, date_end: $date_end, keys: $keys, countries: $countries, continents: $continents) {
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
    trip_status
    creator {
      id
      publicId
      username
    }
  }
}`;

export default searchTrips;