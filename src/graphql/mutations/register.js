import gql from 'graphql-tag';

const register = gql`
mutation register($username: String!, $email: String!, $password: String! $birthday: String!, $gender: String!, $relationship: String!) {
  register(username: $username, email: $email, password: $password, birthday: $birthday, gender: $gender, relationship: $relationship) {
    id
  }
}
`;

export default register; 