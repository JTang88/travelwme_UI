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
    console.log('here is props in message', this.props)
    const { data: { getCurrentUser: { id } } } = this.props
    return (
      this.props.convo.msgs.map((msg, i) => (
        <div key={`msg${i}`} className="message">
          <Image
            cloudName={process.env.REACT_APP_CLOUDNAME}
            className="message-ing-pic"
            publicId={this.state.userConvoTable[msg.userId]}
          />
          <div className= { Number(msg.userId) !== id ? "converser-text-wrap" : "user-text-wrap" }>
            <Typography variant="body2" color="inherit" >{msg.text}</Typography>
          </div>
        </div>
      ))
    )
  }

}
 
export default graphql(getCurrentUser, {
  options: props => ({
    variables: { id: Number(sessionStorage.getItem('currentUserId')) },
  }),
})(Messages);