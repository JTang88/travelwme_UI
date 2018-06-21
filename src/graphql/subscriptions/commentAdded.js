import gql from 'graphql-tag';

const commentAdded = gql`
  subscription commentAdded($tripCommentId: String!) {
    commentAdded(tripCommentId: $tripCommentId) {
      _id
      username
      publicId
      text
    }
  }
`;

export default commentAdded;