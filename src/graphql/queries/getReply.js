import gql from 'graphql-tag';

const getReply = gql`
query getReply($tripCommentId: String!) {
  getReply(tripCommentId: $tripCommentId) {
    _id
    commentId
    username
    publicId
    text
  }
}`;

export default getReply;