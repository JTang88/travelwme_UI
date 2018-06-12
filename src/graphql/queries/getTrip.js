import gql from 'graphql-tag';

const getTrip = gql`
query getTrip($id: Int!) {
  getTrip(id: $id) {
    id
    countries
    description
    title
    gender
    age_start
    age_end
    date_start
    date_end
    trip_keywords
    relationship
    trip_status
    cost
    interesters
    joiners
    forSureGoing
    countries
    continents
    tripCommentId
    creator {
      id
      username
      publicId
      birthday
      gender
      relationship
      description
    }
    members {
      id
      user {
        id
        publicId
        username
        birthday
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

