import gql from 'graphql-tag';

const updateUser = gql`
mutation updateUser($id: Int!, $username: String, $gender: String, $birthday: String, $relationship: String, $description: String) {
  updateUser(id: $id, username: $username, gender: $gender, birthday: $birthday, relationship: $relationship, description: $description) {
    id
    username
    email
    gender
    birthday
    description
    relationship  
    publicId
  }
}
`;

export default updateUser;