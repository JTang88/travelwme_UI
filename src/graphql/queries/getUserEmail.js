import gql from 'graphql-tag';

const getUserEmail = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id  
    email
  }
}`;

export default getUserEmail;