import gql from 'graphql-tag';

export const getCurrentSearchTerms = gql`
  query getCurrentSearchTerms {
    getCurrentSearchTerms @client {
      userId
      cost_start
      cost_end
      date_start
      date_end
      keys
    }
  }`;
export const getCurrentSearchTermsDefault = {
  getCurrentSearchTerms: {
    __typename: 'getCurrentSearchTerms',
    userId: 0,
    cost_start: 1,
    cost_end: 2,
    date_start: '01-01-1000',
    date_end: '01-01-1001',
    keys: '[]',
  },
};