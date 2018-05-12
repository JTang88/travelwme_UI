import gql from 'graphql-tag';

const replyAdded = gql`
  subscription replyAdded($tripId: Int!) {
    replyAdded(tripId: $tripId) {
      tripId
      commentId
      _id
      username
      text
    }
  }
`;

export default replyAdded;