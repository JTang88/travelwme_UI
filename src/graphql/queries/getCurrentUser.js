import gql from 'graphql-tag';

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser @client {
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
    newNotification: false,
    newMessage: false,
  },
};