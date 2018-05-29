import gql from 'graphql-tag';

const getConvo = gql`
query getConvo($convoId: String!) {
  getConvo(convoId: $convoId) {
    _id
    users {
      id
      username
      publicId
    }
    msgs {
      _id
      text
      username
    }
  }
}`;

export default getConvo;

