import gql from 'graphql-tag';

const createTrip = gql`
mutation createTrip(
  $title: String!, 
  $description: String!, 
  $cost: Int, 
  $date_start: String, 
  $date_end: String, 
  $gender: String!,
  $age_start: Int!,
  $age_end: Int!, 
  $relationship: String!, 
  $trip_status: String!,
  $keys: String,
  $interesters: Int,
  $joiners: Int,
  $forSureGoing: Int,
  $body_types: String,
  $trip_keywords: String,
  $creatorId: Int!) {
    createTrip(
      title: $title, 
      description: $description,
      cost: $cost, 
      date_start: $date_start, 
      date_end: $date_end, 
      gender: $gender, 
      age_start: $age_start,
      age_end: $age_end, 
      relationship: $relationship, 
      trip_status: $trip_status,
      keys: $keys,
      interesters: $interesters
      joiners: $joiners
      forSureGoing: $forSureGoing
      body_types: $body_types,
      trip_keywords: $trip_keywords,
      creatorId: $creatorId){
        id
      } 
  }
  `;

export default createTrip;