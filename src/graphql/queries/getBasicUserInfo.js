import gql from 'graphql-tag';

const getBasicUserInfo = gql`
query getBasicUserInfo($id: Int!) {
  getUser(id: $id) {
    id 
    username
    publicId 
    convoListId 
    notificationId
  }
}`;

export default getBasicUserInfo;