import gql from 'graphql-tag';

const getNotifications = gql`
query getNotifications($notificationId: String!) {
  getNotifications(notificationId: $notificationId) {
    _id
    type
    senderName
    tripTitle
    tripId
  }
}`;

export default getNotifications;

// getNotifications(notificationId: "5aff6b8e82d94413a99afc62") {
//   _id
//   type
//   senderName
//   tripTitle
//   tripId
// }