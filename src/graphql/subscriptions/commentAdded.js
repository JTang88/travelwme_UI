import gql from 'graphql-tag';

const commentAdded = gql`
  subscription commentAdded($tripId: Int!) {
    commentAdded(tripId: $tripId) {
      _id
      username
      text
    }
  }
`;

export default commentAdded;