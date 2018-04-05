import gql from 'graphql-tag';

const updateUserPassword = gql`
mutation updateUserPassword($id: Int!, $oldPassword: String!, $newPassword: String!) {
  updateUserPassword(id: $id, oldPassword: $oldPassword, newPassword: $newPassword) 
}
`;

export default updateUserPassword;