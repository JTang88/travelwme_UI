import gql from 'graphql-tag';

const getTripComments = gql`
query getTripComments($tripCommentId: String!) {
  getTripComments(tripCommentId: $tripCommentId) {
    _id
    username
    publicId
    text
  }
}`;

export default getTripComments;
