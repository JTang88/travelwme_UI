import gql from 'graphql-tag';

const toggleNewMessage = gql`
  mutation toggleNewMessage($userId: Int!) {
    toggleNewMessage(userId: $userId) {
      id
      newMessage
    }
  }
`;

export default toggleNewMessage;