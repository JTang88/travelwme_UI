import gql from 'graphql-tag';

// const updateCurrentTrip = gql`
//     mutation updateCurrentTrip($id: Int!, $title: String!, $cost: Int!, $date_start: String!, $date_end: String!) {
//       updateCurrentTrip(id: $id, title: $title, cost: $cost, date_start: $date_start, date_end: $date_end) @client
//     }
//     `;
// export default updateCurrentTrip;

export const updateCurrentTrip = gql`
mutation updateCurrentTrip($id: Int!, $title: String!, $cost: Int!, $date_start: String!, $date_end: String!) {
  updateCurrentTrip(id: $id, title: $title, cost: $cost, date_start: $date_start, date_end: $date_end) @client
}`;

export const updateCurrentTripResolver = {
  updateCurrentTrip: (_, { id, title, cost, date_start, date_end }, { cache }) => {
    const data = {
      getCurrentTrip: {
        __typename: 'getCurrentTrip',
        id, 
        title,
        cost,
        date_start,
        date_end,
      },
    };
    cache.writeData({ data });
    return null;
  },
};
