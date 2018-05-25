import React, { Component } from 'react';
import Message from './Message';

class ChatBox extends Component {
  render() {
    console.log('this is msg in ChatBox', this.props.msgs)
    return (
      <div>
        <h1>ChatBox in the House!!</h1>
        {
          this.props.msgs.map(msg => (
            <Message 
              msg={msg}
            />
          ))
        }
      </div>
    );
  }
}

export default ChatBox;