import gql from 'graphql-tag';

const getTripComments = gql`
query getTripComments($tripId: Int!) {
  getTripComments(tripId: $tripId) {
    _id
    username
    text
  }
}`;

export default getTripComments;

// import gql from 'graphql-tag';

// const getTripComments = gql`
// query getTripComments($tripId: Int!) {
//   getTripComments(tripId: $tripId) {
//     _id
//     username
//     text
//   }
// }`;

// export default getTripComments;