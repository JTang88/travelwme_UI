import gql from 'graphql-tag';

const commentAdded = gql`
  subscription commentAdded($tripCommentId: String!) {
    commentAdded(tripCommentId: $tripCommentId) {
      _id
      username
      text
    }
  }
`;

export default commentAdded;