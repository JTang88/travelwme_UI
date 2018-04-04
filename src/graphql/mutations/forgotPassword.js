import gql from 'graphql-tag';

const forgotPassword = gql`
mutation forgotPassword($email: String!) {
  forgotPassword(email: $email) 
}
`;

export default forgotPassword;