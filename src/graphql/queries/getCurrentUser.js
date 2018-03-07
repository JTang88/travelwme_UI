import gql from 'graphql-tag';

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser @client {
      id
      username
    }
  }`;
export const getCurrentUserDefault = {
  getCurrentUser: {
    __typename: 'getCurrentUser',
    id: 1,
    username: 'Test User',
  },
};