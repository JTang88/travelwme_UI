import gql from 'graphql-tag';

const getTripComments = gql`
query getTripComments($tripCommentId: String!) {
  getTripComments(tripCommentId: $tripCommentId) {
    _id
    username
    text
  }
}`;

export default getTripComments;
