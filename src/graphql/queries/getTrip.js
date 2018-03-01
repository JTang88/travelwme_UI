import gql from 'graphql-tag';

const getTrip = gql`
query getTrip($id: Int!) {
  getTrip(id: $id) {
    title
    date_start
    date_end
    cost
    description
    gender
    age_start
    age_end
    body_types
    trip_keywords
    relationship
    members {
      user {
        id
        username
      }
      user_type
    }
  }
}`;

export default getTrip;

// const Trip = `
//   type Trip {
//     id: Int
//     createdAt: String!
//     updatedAt: String!
//     title: String
//     description: String
//     cost: Int
//     date_start: String
//     date_end: String
//     gender: String
//     age_start: Int
//     age_end: Int
//     body_types: String
//     trip_keywords: String
//     relationship: String
//     trip_status: String
//     user_type: String
//     members: [TripMembers]
//     publicId: String
//   }`;