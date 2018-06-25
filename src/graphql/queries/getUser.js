import gql from 'graphql-tag';

const getUser = gql`
query getUser($id: Int!) {
  getUser(id: $id) {
    id
    username
    email
    gender
    birthday
    description
    relationship  
    publicId
    notificationId
    convoListId
    createdAt
  }
}`;

export default getUser;