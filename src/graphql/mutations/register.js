import gql from 'graphql-tag';

const register = gql`
mutation register($username: String!, $email: String!, $password: String! $age: Int!, $gender: String!, $relationship: String!, $body_type: String!) {
  register(username: $username, email: $email, password: $password, age: $age, gender: $gender, relationship: $relationship, body_type: $body_type) {
    id
  }
}
`;

export default register; 