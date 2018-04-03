import gql from 'graphql-tag';

const updateUser = gql`
mutation updateUser($id: Int!, $username: String, $gender: String, $age: Int, $body_type: String, $relationship: String, $description: String) {
  updateUser(id: $id, username: $username, gender: $gender, age: $age, body_type: $body_type, relationship: $relationship, description: $description) {
    id
    username
    email
    gender
    age
    body_type
    description
    relationship  
    publicId
  }
}
`;

export default updateUser;