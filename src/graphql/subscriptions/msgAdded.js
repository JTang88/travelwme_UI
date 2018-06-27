import gql from 'graphql-tag';

const msgAdded = gql`
  subscription msgAdded($convoId: String!) {
    msgAdded(convoId: $convoId) {
      _id
      text
      userId
    }
  }
`;

export default msgAdded;

