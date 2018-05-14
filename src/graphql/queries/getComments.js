import gql from 'graphql-tag';

const getComments = gql`
query getComments($tripId: Int!) {
  getComments(tripId: $tripId) {
    _id
    username
    text
    reply {
      _id
      tripId
      commentId
      username
      text
    }
  }
}`;

export default getComments;

// import gql from 'graphql-tag';

// const getComments = gql`
// query getComments($tripId: Int!) {
//   getComments(tripId: $tripId) {
//     _id
//     username
//     text
//   }
// }`;

// export default getComments;