import gql from 'graphql-tag';

// const updateCurrentUser = gql`
//     mutation updateCurrentUser($id: Int!, $username: String!) {
//       updateCurrentUser(id: $id, username: $username) @client
//     }
//     `;
// export default updateCurrentUser;


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

