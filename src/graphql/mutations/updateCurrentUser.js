import gql from 'graphql-tag';

const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int!, $username: String!) {
      updateCurrentUser(id: $id, username: $username) @client
    }
    `;
export default updateCurrentUser;

