import gql from 'graphql-tag';

const newReply = gql`
  mutation newReply($tripCommentId: String!, $commentId: String!, $username: String!, $text: String!) {
    newReply(tripCommentId: $tripCommentId, commentId: $commentId, username: $username, text: $text) {
      commentId
      _id
      text
      username
    }
  }
`;

export default newReply;