import gql from 'graphql-tag';

const newComment = gql`
  mutation newComment($tripCommentId: String!, $username: String!, $text: String!) {
    newComment(tripCommentId: $tripCommentId, username: $username, text: $text) {
      _id
      text
      username
    }
  }
`;

export default newComment;