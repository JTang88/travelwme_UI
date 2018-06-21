import gql from 'graphql-tag';

const replyAdded = gql`
  subscription replyAdded($tripCommentId: String!) {
    replyAdded(tripCommentId: $tripCommentId) {
      commentId
      _id
      username
      publicId
      text
    }
  }
`;

export default replyAdded;