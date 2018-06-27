import gql from 'graphql-tag';

const getCurrentConvo = gql`
query getCurrentConvo($convoId: String!) {
  getConvo(convoId: $convoId) @client {
    _id
    users {
      id
      username
      publicId
    }
    msgs {
      text
      userId
    }
  }
}`;

export default getCurrentConvo;