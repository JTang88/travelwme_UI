import gql from 'graphql-tag';

const updateCurrentTrip = gql`
    mutation updateCurrentTrip($id: Int!, $title: String!, $cost: Int!, $date_start: String!, $date_end: String!) {
      updateCurrentTrip(id: $id, title: $title, cost: $cost, date_start: $date_start, date_end: $date_end) @client
    }
    `;
export default updateCurrentTrip;