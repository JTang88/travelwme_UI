import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Image } from 'cloudinary-react';
import { Typography, withStyles } from '@material-ui/core';
import getConvo from '../../../../graphql/queries/getConvo';
import msgAdded from '../../../../graphql/subscriptions/msgAdded';
import { getChatBoxState } from '../../../../graphql/queries/getChatBoxState';
import { updateChatBoxState } from '../../../../graphql/mutations/updateChatBoxState';

const styles = {
  root: {
    display: 'inline-block',
  }
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
            receiverUserId: null,
          },
        });
      }
    }
  }

  handleSelection = (e) => {
    e.preventDefault();
    this.props.updateChatBoxStateMutation({
      variables: {
        open: true,
        currentConvoId: this.props.getConvoQuery.getConvo._id,
        currentReceiver: null,
        receiverUserId: null,
      },
    });
  }

  render() {
    console.log('here is props in ConvoSelect')
    const { classes, currentUser } = this.props;
    return this.props.getConvoQuery.loading ? '' : (
      <div onClick={this.handleSelection}>
        {
          this.props.getConvoQuery.getConvo.users.map((user, i) => {
            if (user.username !== currentUser.username) {
              return (
                <div key={`convoSelect${i}`} style={{ display: 'inline-block'}}>
                  <Image
                    cloudName="travelwme"
                    className="message-pic"
                    publicId={user.publicId}
                  />
                  <Typography
                    className={classes.root}
                    variant="body2"
                    key={`userListInMsg${i}`}
                  >
                    {`${user.username} & You -  `}
                  </Typography>
                </div>  
              )
            }
          })
        }
        <Typography
          className={classes.root}
          variant="body2"
          color="primary"
        >
          { 
            this.props.getConvoQuery.getConvo.msgs[this.props.getConvoQuery.getConvo.msgs.length - 1].username === currentUser.username ? 'You: ' :
            `${this.props.getConvoQuery.getConvo.msgs[this.props.getConvoQuery.getConvo.msgs.length - 1].username}:`   
          }
        </Typography>
        <Typography
          variant="body1"
          className={classes.root}
        >     
         {`${this.props.getConvoQuery.getConvo.msgs[this.props.getConvoQuery.getConvo.msgs.length-1].text.substring(0, 20)}...`}
        </Typography>
       
      </div>
    );
  }
}

const WrappedConvoSelect = compose(
  graphql(getChatBoxState, {
    name: 'getChatBoxStateQuery'
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