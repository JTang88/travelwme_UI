import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getNotifications from '../../../../graphql/queries/getNotifications';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import noteAdded from '../../../../graphql/subscriptions/noteAdded';
import Accepted from './Accepted';
import Request from './Request';

class Notifications extends Component {
  componentWillMount() {
    const { notificationId } = this.props.getCurrentUserQuery.getCurrentUser
    this.props.getNotificationsQuery.subscribeToMore({
      document: noteAdded,
      variables: {
        notificationId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newNote = subscriptionData.data.noteAdded;
        if (!prev.getNotifications.find(note => note._id === newNote._id)) {
          const current = Object.assign({}, prev, {
            getNotifications: [...prev.getNotifications, newNote],
          });
          return current;
        }
        return prev;
      },
    });
  }

  render() {
    return (
      this.props.getNotificationsQuery.loading ? 'loading notifications' :
      <div>
        { 
          this.props.getNotificationsQuery.getNotifications.map((note, i) => {
            if (note.type === 'accepted') {
              return (
                <Accepted
                  key={`accepted${i}`}
                  tripId={note.tripId} 
                  senderName={note.senderName}
                  tripTitle={note.tripTitle}
                  userId={this.props.getCurrentUserQuery.getCurrentUser.id}
                />
              );
            } else if (note.type === 'request') {
              return (
                <Request
                  key={`request${i}`}
                  tripId={note.tripId}
                  senderName={note.senderName}
                  tripTitle={note.tripTitle}
                  userId={this.props.getCurrentUserQuery.getCurrentUser.id}
                />
              );
            }
              return 'testing';  
          })
        }
      </div>
    );
  }
}

const WrappedNotifications = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
  }),
  graphql(getNotifications, {
    name: 'getNotificationsQuery',
    options: props => ({ variables: { notificationId: props.getCurrentUserQuery.getCurrentUser.notificationId } }),
  }),
)(Notifications);

export default WrappedNotifications;
