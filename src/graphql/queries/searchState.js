import gql from 'graphql-tag';

export const searchState = gql`
  query searchState {
    searchState @client {
      searched
    }
  }`;
export const searchStateDefault = {
  searchState: {
    __typename: 'searchState',
    searched: false,
  },
};