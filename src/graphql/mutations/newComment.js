import gql from 'graphql-tag';

const newComment = gql`
  mutation newComment($tripId: Int!, $username: String!, $text: String!) {
    newComment(tripId: $tripId, username: $username, text: $text) {
      _id
      text
      username
    }
  }
`;

export default newComment;