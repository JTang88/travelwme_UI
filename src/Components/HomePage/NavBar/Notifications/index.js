import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Menu, MenuItem, withStyles } from '@material-ui/core';
import getNotifications from '../../../../graphql/queries/getNotifications';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import { updateNewNotificationCache } from '../../../../graphql/mutations/updateNewNotificationCache';
import toggleNewNotification from '../../../../graphql/mutations/toggleNewNotification';
import noteAdded from '../../../../graphql/subscriptions/noteAdded';
import BarButton from '../../../Global/BarButton';
import Accepted from './Accepted';
import Request from './Request';

const style = {
  root: {
    paddingLeft: 10,
    paddingRight: 10,
    height: '40px',
  },
}

class Notifications extends Component {
  state = {
    anchorEl: null
  };
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

        this.props.updateNewNotificationCacheMutation({
          variables: {
            id: this.props.getCurrentUserQuery.getCurrentUser.id,
            newNotification: true,
          }
        })

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

  handleNotificationsClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.toggleNewNotificationMutation({
      variables: {
        userId: this.props.getCurrentUserQuery.getCurrentUser.id
      }
    })
  };


  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <div style={{ display: 'inline' }}>
        <BarButton onClick={this.handleNotificationsClick}>Notifications</BarButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            this.props.getNotificationsQuery.loading ? 'loading notifications' :
              this.props.getNotificationsQuery.getNotifications.map((note, i) => {
                if (note.type === 'accepted') {
                  return (
                    <MenuItem key={`accepted${i}`} classes={{ root: classes.root }}>
                      <Accepted
                        tripId={note.tripId}
                        senderName={note.senderName}
                        tripTitle={note.tripTitle}
                        userId={this.props.getCurrentUserQuery.getCurrentUser.id}
                      />
                    </MenuItem>
                  );
                } else if (note.type === 'request') {
                  return (
                    <MenuItem key={`request${i}`} classes={{ root: classes.root }}>
                      <Request
                        tripId={note.tripId}
                        senderName={note.senderName}
                        tripTitle={note.tripTitle}
                        userId={this.props.getCurrentUserQuery.getCurrentUser.id}
                      />
                    </MenuItem>
                  );
                }
              })
          }
        </Menu> 
      </div>
    );
  }
}
toggleNewNotification
const WrappedNotifications = compose(
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(toggleNewNotification, {
    name: 'toggleNewNotificationMutation',
  }),
  graphql(updateNewNotificationCache, {
    name: 'updateNewNotificationCacheMutation',
  }),
  graphql(getNotifications, {
    name: 'getNotificationsQuery',
    options: props => ({ variables: { notificationId: props.getCurrentUserQuery.getCurrentUser.notificationId } }),
  }),
)(Notifications);

export default withStyles(style)(WrappedNotifications);
