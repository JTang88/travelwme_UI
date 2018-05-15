import gql from 'graphql-tag';

const newReply = gql`
  mutation newReply($tripId: Int!, $commentId: String!, $username: String!, $text: String!) {
    newReply(tripId: $tripId, commentId: $commentId, username: $username, text: $text) {
      tripId
      commentId
      _id
      text
      username
    }
  }
`;

export default newReply;