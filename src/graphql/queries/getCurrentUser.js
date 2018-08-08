import gql from 'graphql-tag';

export const getCurrentUser = gql`
  query getCurrentUser($id: Int!) {
    getCurrentUser(id: $id) {
      id
      username
      publicId
      notificationId
      convoListId
      newNotification
      newMessage
    }
  }`;
export const getCurrentUserDefault = {
  getCurrentUser: {
    __typename: 'getCurrentUser',
    id: 1,
    username: '',
    publicId: null,
    notificationId: null,
    convoListId: null,
    newNotification: null,
    newMessage: null,
  },
};