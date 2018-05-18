import gql from 'graphql-tag';

const replyAdded = gql`
  subscription replyAdded($tripCommentId: String!) {
    replyAdded(tripCommentId: $tripCommentId) {
      commentId
      _id
      username
      text
    }
  }
`;

export default replyAdded;