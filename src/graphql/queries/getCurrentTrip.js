import gql from 'graphql-tag';

export const getCurrentTrip = gql`
  query getCurrentTrip {
    getCurrentTrip @client {
      title
      cost
      date_start
      date_end
      creator {
        id
        publicId
        username
      }
    }
  }`;

export const getCurrentTripDefault = {
  getCurrentTrip: {
    __typename: 'getCurrentTrip',
    id: 1,
    title: 'test trip',
    cost: 1,
    date_start: '2010-11-15',
    date_end: '2015-02-07',
    creator: {
      id: 1,
      publicId: '',
      username: 'test',
    },
  },
};
