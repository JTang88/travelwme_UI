import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withStyles, Typography } from '@material-ui/core';
import Messages from './Messages';
import getCurrentConvo from '../../../graphql/queries/getCurrentConvo';
import AddMessage from './AddMessage';
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
  render() {
    console.log('here is props in chatBox', this.props);
    const { classes } = this.props;
    return (
      <div className="sticky-chatbox">
        <div className="chat-header">
          <Typography className={classes.root} variant="body2" color="primary" >Live Chat</Typography>
          <Typography className={classes.x}variant="body2" color="primary" >X</Typography>
          <div className="clearfix" />
        </div>
        <div className="message-container">
          {
            this.props.data.getConvo ?
              <Messages 
                convo={this.props.data.getConvo}
              /> : null
          }
        </div>
        <AddMessage />
      </div>
      
    );  
  }
}

const WrappedChatBox = graphql(getCurrentConvo, {
  options: props => ({
    variables: { convoId: props.convoId },
  }),
})(withStyles(styles)(ChatBox));

export default WrappedChatBox;


// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import Message from './Message';
// import getCurrentConvo from '../../../graphql/queries/getCurrentConvo';
// import AddMessage from './AddMessage';
// import './index.css';

// class ChatBox extends Component {
//   render() {
//     return (
//       <div className="sticky-chatbox">
//         <h1>ChatBox in the House!!</h1>
//         {
//           this.props.data.getConvo ?
//           this.props.data.getConvo.msgs.map((msg, i) => (
//             <Message 
//               msg={msg}
//               key={`msg${i}`}
//             />
//           )) : null 
//         }
//         <AddMessage />
//       </div>
//     );
//   }
// }

// const WrappedChatBox = graphql(getCurrentConvo, {
//   options: props => ({
//     variables: { convoId: props.convoId },
//   }),
// })(ChatBox);

// export default WrappedChatBox;