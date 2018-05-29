import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Message from './Message';
import getCurrentConvo from '../../../graphql/queries/getCurrentConvo';
import AddMessage from './AddMessage';

class ChatBox extends Component {
  render() {
    return (
      <div>
        <h1>ChatBox in the House!!</h1>
        {
          this.props.data.getConvo ?
          this.props.data.getConvo.msgs.map(msg => (
            <Message 
              msg={msg}
            />
          )) : null 
        }
        <AddMessage />
      </div>
    );
  }
}

const WrappedChatBox = graphql(getCurrentConvo, {
  options: props => ({
    variables: { convoId: props.convoId },
  }),
})(ChatBox);

export default WrappedChatBox;