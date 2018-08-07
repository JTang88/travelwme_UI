import gql from 'graphql-tag';

export const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int, $username: String, $publicId: String, $convoListId: String, $notificationId: String, $newNotification: Boolean, $newMessage: Boolean) {
      updateCurrentUser(id: $id, username: $username, publicId: $publicId, convoListId: $convoListId, notificationId: $notificationId, newNotification: $newNotification, newMessage: $newMessage) @client
    }`;

export const updateCurrentUserResolver = { 
  updateCurrentUser: (_, { id, username, publicId, convoListId, notificationId, newNotification, newMessage }, { cache }) => {
    const data = {
      getCurrentUser: {
        __typename: 'getCurrentUser',
        id, 
        username,
        publicId, 
        convoListId, 
        notificationId,
        newNotification,
        newMessage,
      },
    };
    cache.writeData({ data });
    return null;
  },
};

