import gql from 'graphql-tag';

const newMsg = gql`
  mutation newMsg($receiverUserId: Int!, $userId: Int!, $text: String!, $convoId: String!) {
    newMsg(receiverUserId: $receiverUserId, userId: $userId, text: $text, convoId: $convoId) {
      _id
      text
      userId
    }
  }
`;

export default newMsg;

// newMsg(username: String!, text: String!, convoId: String!): Msg
