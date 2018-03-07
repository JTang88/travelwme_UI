import gql from 'graphql-tag';

export const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int!, $username: String!) {
      updateCurrentUser(id: $id, username: $username) @client
    }`;

export const updateCurrentUserResolver = { 
  updateCurrentUser: (_, { id, username }, { cache }) => {
    const data = {
      getCurrentUser: {
        __typename: 'getCurrentUser',
        id, 
        username,
      },
    };
    cache.writeData({ data });
    return null;
  },
};

