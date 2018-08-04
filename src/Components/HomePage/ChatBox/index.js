import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withStyles, Typography } from '@material-ui/core';
import Messages from './Messages';
import getCurrentConvo from '../../../graphql/queries/getCurrentConvo';
import AddMessage from './AddMessage';
import { updateChatBoxState } from '../../../graphql/mutations/updateChatBoxState';
import './index.css';


const styles = {
  root: {
    display: 'inline-block',
  },
  x: {
    float: 'right',
  },
};

class ChatBox extends Component {
  handleClose = (e) => {
    e.preventDefault();
    this.props.updateChatBoxStateMutation({
      variables: {
        open: false,
        currentConvoId: null,
        currentReceiver: null,
        receiverUserId: null,
      },
    });
  }

  render() {
    console.log('here is props in chatBox', this.props);
    const { classes } = this.props;
    return (
      <div className="sticky-chatbox">
        <div className="chat-header">
          <Typography className={classes.root} variant="body2" color="primary" >Live Chat</Typography>
          <a href="">
            <Typography onClick={this.handleClose} className={classes.x} variant="body2" color="primary" >X</Typography>
          </a>
          <div className="clearfix" />
        </div>
        <div className="message-container">
          {
            this.props.getCurrentConvoQuery.getConvo ?
              <Messages 
                convo={this.props.getCurrentConvoQuery.getConvo}
              /> : null
          }
        </div>
        <AddMessage />
      </div>
      
    );  
  }
}

const WrappedChatBox = compose(
  graphql(getCurrentConvo, {
    name: 'getCurrentConvoQuery',
    options: props => ({
      variables: { convoId: props.convoId },
    }),
  }),
  graphql(updateChatBoxState, {
    name: 'updateChatBoxStateMutation',
  }),
)(withStyles(styles)(ChatBox));

export default WrappedChatBox;