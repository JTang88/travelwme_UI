import gql from 'graphql-tag';

const register = gql`
mutation register($username: String!, $email: String!, $password: String! $age: Int!, $gender: String!, $relationship: String!) {
  register(username: $username, email: $email, password: $password, age: $age, gender: $gender, relationship: $relationship) {
    id
  }
}
`;

export default register; 