import gql from 'graphql-tag';

export const updateCurrentSearchTerms = gql`
  mutation updateCurrentSearchTerms(
    $userId: Int!,
    $cost_start: Int!, 
    $cost_end: Int!, 
    $date_start: String!,  
    $date_end: String!, 
    $keys: String!
   ) {
    updateCurrentSearchTerms(
      userId: $userId,
      cost_start: $cost_start, 
      cost_end: $cost_end, 
      date_start: $date_start, 
      date_end: $date_end,
      keys: $keys 
    ) @client
  }`;

export const updateCurrentSearchTermsResolver = { 
  updateCurrentSearchTerms: async (_, { userId, cost_start, cost_end, date_start, date_end, keys }, { cache }) => {
    console.log('did it even hit here');
    const data = {
      getCurrentSearchTerms: {
        __typename: 'getCurrentSearchTerms',
        userId,
        cost_start, 
        cost_end, 
        date_start, 
        date_end, 
        keys,
      },
    };
    cache.writeData({ data });
    return null;
  },
};