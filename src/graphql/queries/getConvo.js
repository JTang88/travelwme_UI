import gql from 'graphql-tag';

const getConvo = gql`
query getConvo($convoId: String!) {
  getConvo(convoId: $convoId) {
    _id
    users {
      username
      publicId
    }
    msgs {
      text
      username
    }
  }
}`;

export default getConvo;

