import gql from 'graphql-tag';

const newConvo = gql`
  mutation newConvo($convoListId: String!, $receiverUserId: Int!, $userId: Int!, $text: String!) {
    newConvo(convoListId: $convoListId, receiverUserId: $receiverUserId, userId: $userId, text: $text) 
  }
`;

export default newConvo;

// newConvo(convoListId: String!, senderConvoListId: String!, username: String!, userId: Int!, text: String!): String
