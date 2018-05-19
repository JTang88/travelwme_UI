import gql from 'graphql-tag';

export const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int, $username: String, $publicId: String, $convoListId: String, $notificationId: String) {
      updateCurrentUser(id: $id, username: $username, publicId: $publicId, convoListId: $convoListId, notificationId: $notificationId) @client
    }`;

export const updateCurrentUserResolver = { 
  updateCurrentUser: (_, { id, username, publicId, convoListId, notificationId }, { cache }) => {
    const data = {
      getCurrentUser: {
        __typename: 'getCurrentUser',
        id, 
        username,
        publicId, 
        convoListId, 
        notificationId,
      },
    };
    cache.writeData({ data });
    return null;
  },
};

