import gql from 'graphql-tag';

const noteAdded = gql`
  subscription noteAdded($notificationId: String!) {
    noteAdded(notificationId: $notificationId) {
      _id
      type
      senderName
      tripTitle
      tripId
    }
  }
`;

export default noteAdded;

// noteAdded(notificationId: String!): Note

// subscription {
//   noteAdded(notificationId: "5aff6b5982d94413a99afbf4") {
//     _id
//     type
//     senderName
//     tripTitle
//     tripId
//   }