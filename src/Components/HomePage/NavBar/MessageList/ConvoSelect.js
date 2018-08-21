import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Typography, withStyles } from '@material-ui/core';
import getConvo from '../../../../graphql/queries/getConvo';
import msgAdded from '../../../../graphql/subscriptions/msgAdded';
import { getCurrentUser } from '../../../../graphql/queries/getCurrentUser';
import { getChatBoxState } from '../../../../graphql/queries/getChatBoxState';
import { updateChatBoxState } from '../../../../graphql/mutations/updateChatBoxState';
import { updateNewMessageStateCache } from '../../../../graphql/mutations/updateNewMessageStateCache';

const styles = {
  root: {
    display: 'inline-block',
  },
}

class ConvoSelect extends Component {
  componentWillMount() {
    const { convoId } = this.props;
    this.props.getConvoQuery.subscribeToMore({
      document: msgAdded,
      variables: {
        convoId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        if (Number(subscriptionData.data.msgAdded.userId) !== this.props.getCurrentUserQuery.getCurrentUser.id) {
          // const variables = Object.assign({}, this.props.getCurrentUserQuery.getCurrentUser, { newMessage: true })
          // do something
          this.props.updateNewMessageStateCacheMutation({
            variables: {
              id: this.props.getCurrentUserQuery.getCurrentUser.id,
              newMessage: true,
            }
          })
        }

        const newMsg = subscriptionData.data.msgAdded;
        if (!prev.getConvo.msgs.find(msg => msg._id === newMsg._id)) {
          const current = Object.assign({}, prev, {
            getConvo: Object.assign({}, prev.getConvo, {
              msgs: [...prev.getConvo.msgs, newMsg],
            }),
          });
          return current;
        }
        return prev;
      },
    });
  }

  componentDidUpdate() {
    if (!this.props.getConvoQuery.loading) {
      const { users, _id } = this.props.getConvoQuery.getConvo;
      const { open, currentConvoId, receiverUserId } = this.props.getChatBoxStateQuery.getChatBoxState;
      if (open && currentConvoId === 'newConvo' && users.length === 2 && users.find(user => user.id === receiverUserId)) {
        this.props.updateChatBoxStateMutation({
          variables: {
            open: true,
            currentConvoId: _id,
            currentReceiver: null,
            receiverUserId,
          },
        });
      }
    }
  }

  handleSelection = (e) => {
    e.preventDefault();
    const { users } = this.props.getConvoQuery.getConvo;
    const { id } = this.props.currentUser;
    let receiverUserId = null

    for (let i = 0; i < users.length; i++) {
      if (users[i].id !== id) {
        receiverUserId = users[i].id
      }
    }


    this.props.updateChatBoxStateMutation({
      variables: {
        open: true,
        currentConvoId: this.props.getConvoQuery.getConvo._id,
        currentReceiver: null,
        receiverUserId,
      },
    });
  }

  render() {
    console.log('here is props in ConvoSelect')
    const { classes, currentUser } = this.props;
    return this.props.getConvoQuery.loading ? '' : (
      <div className="convo-list-container" onClick={this.handleSelection}>
        <div className="convo-container">
          {
            this.props.getConvoQuery.getConvo.users.map((user, i) => {
              if (user.id !== currentUser.id) {
                return (
                  <div key={`convoSelect${i}`}>
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDNAME}
                      className="message-pic"
                      publicId={user.publicId}
                    />
                    <div className="msg-subs">
                      <Typography
                        className={classes.root}
                        variant="body2"
                        color="primary"
                        key={`userListInMsg${i}`}
                      >
                        {`${user.username} & You -`}&nbsp;
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classes.root}
                      >
                        {`${this.props.getConvoQuery.getConvo.msgs[this.props.getConvoQuery.getConvo.msgs.length - 1].text.substring(0, 20)}...`}
                      </Typography>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </div> 
    );
  }
}

const WrappedConvoSelect = compose(
  graphql(getChatBoxState, {
    name: 'getChatBoxStateQuery'
  }),
  graphql(updateNewMessageStateCache, {
    name: 'updateNewMessageStateCacheMutation'
  }),
  graphql(getCurrentUser, {
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }),
  }),
  graphql(getConvo, {
    name: 'getConvoQuery',
    options: props => ({
      variables: {
        convoId: props.convoId,
      },
    }),
  }),
  graphql(updateChatBoxState, {
    name: 'updateChatBoxStateMutation',
  }),
)(withStyles(styles)(ConvoSelect));

export default WrappedConvoSelect;