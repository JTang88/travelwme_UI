import gql from 'graphql-tag';

const updateUserEmail = gql`
mutation updateUserEmail($id: Int!, $email: String!) {
  updateUserEmail(id: $id, email: $email) {
    id
    email
  }
}
`;

export default updateUserEmail;