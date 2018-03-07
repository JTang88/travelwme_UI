import gql from 'graphql-tag';

// const getCurrentUser = gql`
// query getCurrentUser {
//   getCurrentUser @client {
//     id
//     username
//   }
// }`;

// export default getCurrentUser;

export default {
  getCurrentUser: gql`
    query getCurrentUser {
      getCurrentUser @client {
        id
        username
      }
    }`,
  getCurrentUserDefault: {
    getCurrentUser: {
      __typename: 'getCurrentUser',
      id: 1,
      username: 'Test User',
    },
  },
};