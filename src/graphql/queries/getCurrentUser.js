import gql from 'graphql-tag';

const getCurrentUser = gql`
query getCurrentUser {
  getCurrentUser @client {
    id
    username
  }
}`;

export default getCurrentUser;