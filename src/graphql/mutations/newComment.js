import gql from 'graphql-tag';

const newComment = gql`
  mutation newComment($tripCommentId: String!, $publicId: String, $username: String!, $text: String!) {
    newComment(tripCommentId: $tripCommentId, publicId: $publicId, username: $username, text: $text) {
      _id
      text
      username
      publicId
    }
  }
`;

export default newComment;