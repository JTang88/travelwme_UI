import gql from 'graphql-tag';

const newReply = gql`
  mutation newReply($tripId: Int!, commentId: String!, $username: String!, $text: String!) {
    newReply(tripId: $tripId, commentId: $commentId, username: $username, text: $text) {
      _id
      text
      commentId
      tripId
      username
    }
  }
`;

export default newReply;