import gql from 'graphql-tag';

const convoAdded = gql`
  subscription convoAdded($convoListId: String!) {
    convoAdded(convoListId: $convoListId) 
  }
`;

export default convoAdded;

// convoAdded(convoListId: String!): String
