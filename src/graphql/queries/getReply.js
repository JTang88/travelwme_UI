import gql from 'graphql-tag';

const getReply = gql`
query getReply($tripId: Int!) {
  getReply(tripId: $tripId) {
    _id
    tripId
    commentId
    username
    text
  }
}`;

export default getReply;