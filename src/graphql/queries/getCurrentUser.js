import gql from 'graphql-tag';

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser @client {
      id
      username
      publicId 
    }
  }`;
export const getCurrentUserDefault = {
  getCurrentUser: {
    __typename: 'getCurrentUser',
    id: 1,
    username: 'Test User',
    publicId: null,
  },
};