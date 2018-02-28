import gql from 'graphql-tag';

const getCurrentUser = gql`
query getCurrentUser ($id: Int!, $username: String!) {
  getCurrentUser(id: $id, username: $username) @client {
    id
    username
  }
}`;

export default getCurrentUser;