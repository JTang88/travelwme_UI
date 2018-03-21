import gql from 'graphql-tag';

export const updateSearchState = gql`
    mutation updateSearchState($searched: Boolean!) {
      updateSearchState(searched: $searched) @client
    }`;

export const updateSearchStateResolver = { 
  updateSearchState: (_, { searched }, { cache }) => {
    const data = {
      searchState: {
        __typename: 'searchState',
        searched,
      },
    };
    cache.writeData({ data });
    return null;
  },
};

