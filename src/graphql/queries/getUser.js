import gql from 'graphql-tag';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    username
    email
    gender
    age
    description
    relationship  
    publicId
    notificationId
    convoListId
  }
}`;

export default getUser;