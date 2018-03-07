import gql from 'graphql-tag';

// const getCurrentTrip = gql`
// query getCurrentTrip {
//   getCurrentTrip @client {
//     title
//     cost
//     date_start
//     date_end
//   }
// }`;

// export default getCurrentTrip;

export default {
  getCurrentTrip: gql`
    query getCurrentTrip {
      getCurrentTrip @client {
        title
        cost
        date_start
        date_end
      }
    }`,
  getCurrentTripDefault: {
    getCurrentTrip: {
      __typename: 'getCurrentUser',
      id: 1,
      title: 'test trip',
      cost: 1,
      date_start: '2010-11-15',
      date_end: '2015-02-07',
    },
  },
}; 

