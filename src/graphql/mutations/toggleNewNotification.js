import gql from 'graphql-tag';

const toggleNewNotification = gql`
  mutation toggleNewNotification($userId: Int!) {
    toggleNewNotification(userId: $userId) {
      id
      newNotification
    } 
  }
`;

export default toggleNewNotification;