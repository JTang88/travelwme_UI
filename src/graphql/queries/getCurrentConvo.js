import gql from 'graphql-tag';

const getCurrentConvo = gql`
query getCurrentConvo($convoId: String!) {
  getConvo(convoId: $convoId) @client {
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

export default getCurrentConvo;