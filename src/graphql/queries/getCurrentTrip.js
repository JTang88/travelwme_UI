import gql from 'graphql-tag';

const getCurrentTrip = gql`
query getCurrentTrip {
  getCurrentTrip @client {
    title
    cost
    date_start
    date_end
  }
}`;

export default getCurrentTrip;