import gql from 'graphql-tag';

const getTrip = gql`
query getTrip($id: Int!) {
  getTrip(id: $id) {
    description
    title
    gender
    age_start
    age_end
    date_start
    date_end
    body_types
    trip_keywords
    relationship
    trip_status
    cost
    interesters
    joiners
    forSureGoing
    countries
    continents
    creator {
      id
      username
      publicId
      age
      gender
      relationship
    }
    members {
      id
      user {
        id
        publicId
        username
        age
        gender
        relationship
      }
      forSureGoing
      user_type
      updatedAt
    }
  }
}
`;

export default getTrip;

