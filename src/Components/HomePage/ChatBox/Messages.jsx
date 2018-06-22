import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { graphql } from 'react-apollo';
import { Image } from 'cloudinary-react';
import makeUserConvoTable from '../../../services/makeUserMessageTable';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';


class Messages extends Component {
  state = {
    userConvoTable: makeUserConvoTable(this.props.convo)
  }
  
  render () {
    const { data: { getCurrentUser: { username } } } = this.props
    return (
      this.props.convo.msgs.map((msg, i) => (
        <div key={`msg${i}`} className="message">
          {/* {
            msg.username !== username ?
              <Image
                cloudName="travelwme"
                className="message-ing-pic"
                publicId={this.state.userConvoTable[msg.username]}
              /> : null
          }        */}
          <Image
            cloudName="travelwme"
            className="message-ing-pic"
            publicId={this.state.userConvoTable[msg.username]}
          /> 
          <div className= { msg.username !== username ? "converser-text-wrap" : "user-text-wrap" }>
            <Typography variant="body2" color="inherit" >{msg.text}</Typography>
          </div>
        </div>
      ))
    )
  }

}
 
export default graphql(getCurrentUser)(Messages);