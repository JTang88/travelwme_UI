import gql from 'graphql-tag';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
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
}`;

export default getUser;