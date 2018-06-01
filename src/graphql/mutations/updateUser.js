import gql from 'graphql-tag';

const updateUser = gql`
mutation updateUser($id: Int!, $username: String, $gender: String, $age: Int, $relationship: String, $description: String) {
  updateUser(id: $id, username: $username, gender: $gender, age: $age, relationship: $relationship, description: $description) {
    id
    username
    email
    gender
    age
    description
    relationship  
    publicId
  }
}
`;

export default updateUser;