import gql from 'graphql-tag';

const newMsg = gql`
  mutation newMsg($username: String!, $text: String!, $convoId: String!) {
    newMsg(username: $username, text: $text, convoId: $convoId) {
      _id
      text
      username
    }
  }
`;

export default newMsg;

// newMsg(username: String!, text: String!, convoId: String!): Msg
