import gql from 'graphql-tag';

const getReply = gql`
query getReply($tripId: Int!) {
  getReply(tripId: $tripId) {
    tripId
    _id
    commentId
    username
    text
  }
}`;

export default getReply;