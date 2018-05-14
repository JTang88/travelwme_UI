import gql from 'graphql-tag';

const commentAdded = gql`
  subscription commentAdded($tripId: Int!) {
    commentAdded(tripId: $tripId) {
      _id
      username
      text
      reply {
        _id
        username
        text
        commentId
        tripId
      }
    }
  }
`;

export default commentAdded;