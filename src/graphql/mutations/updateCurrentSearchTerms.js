import gql from 'graphql-tag';

export const updateCurrentSearchTerms = gql`
  mutation updateCurrentSearchTerms(
    $userId: Int!,
    $cost_start: Int!, 
    $cost_end: Int!, 
    $date_start: String!,  
    $date_end: String!, 
    $keys: String!
    $country: String,
    $continent: String,
   ) {
    updateCurrentSearchTerms(
      userId: $userId,
      cost_start: $cost_start, 
      cost_end: $cost_end, 
      date_start: $date_start, 
      date_end: $date_end,
      keys: $keys,
      country: $country,
      continent: $continent

    ) @client
  }`;

export const updateCurrentSearchTermsResolver = { 
  updateCurrentSearchTerms: async (_, { userId, cost_start, cost_end, date_start, date_end, keys, country, continent }, { cache }) => {
    console.log('here is country', country);
    const data = {
      getCurrentSearchTerms: {
        __typename: 'getCurrentSearchTerms',
        userId,
        cost_start, 
        cost_end, 
        date_start, 
        date_end, 
        keys,
        country,
        continent,
      },
    };
    cache.writeData({ data });
    return null;
  },
};