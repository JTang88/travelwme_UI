import gql from 'graphql-tag';

const getReply = gql`
query getReply($tripCommentId: String!) {
  getReply(tripCommentId: $tripCommentId) {
    _id
    commentId
    username
    text
  }
}`;

export default getReply;