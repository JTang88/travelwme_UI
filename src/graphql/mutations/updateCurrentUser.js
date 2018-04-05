import gql from 'graphql-tag';

export const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int!, $username: String! $publicId: String) {
      updateCurrentUser(id: $id, username: $username, publicId: $publicId) @client
    }`;

export const updateCurrentUserResolver = { 
  updateCurrentUser: (_, { id, username, publicId }, { cache }) => {
    const data = {
      getCurrentUser: {
        __typename: 'getCurrentUser',
        id, 
        username,
        publicId, 
      },
    };
    cache.writeData({ data });
    return null;
  },
};

