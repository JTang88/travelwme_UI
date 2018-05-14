import gql from 'graphql-tag';

const newComment = gql`
  mutation newComment($tripId: Int!, $username: String!, $text: String!) {
    newComment(tripId: $tripId, username: $username, text: $text) {
      tripId
      _id
      text
      username
      reply {
        _id
      }
    }
  }
`;

export default newComment;


// mutation {
//   newComment(tripId: 99, username: "Tom", text: "Yeah this shit sucks") {
//     text
//     tripId
//     username
//     _id
//   }
// }