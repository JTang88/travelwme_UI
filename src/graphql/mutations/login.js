import gql from 'graphql-tag';

const login = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) 
}
`;

export default login;