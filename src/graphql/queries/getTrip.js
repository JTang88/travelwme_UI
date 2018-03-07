import gql from 'graphql-tag';

const getTrip = gql`
query getTrip($id: Int!) {
  getTrip(id: $id) {
    description
    gender
    age_start
    age_end
    body_types
    trip_keywords
    relationship
    trip_status
    members {
      user {
        id
        username
        age
        gender
        relationship
      }
      user_type
    }
  }
}
`;

export default getTrip;

