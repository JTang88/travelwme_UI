import gql from 'graphql-tag';

const newReply = gql`
  mutation newReply($tripCommentId: String!, $commentId: String!, $publicId: String, $username: String!, $text: String!) {
    newReply(tripCommentId: $tripCommentId, commentId: $commentId, publicId: $publicId, username: $username, text: $text) {
      commentId
      _id
      text
      username
      publicId
    }
  }
`;

export default newReply;