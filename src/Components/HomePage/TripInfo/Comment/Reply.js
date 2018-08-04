import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Button, TextField } from '@material-ui/core';
import getReply from '../../../../graphql/queries/getReply';
import newReply from '../../../../graphql/mutations/newReply';

class Reply extends Component {
  state = {
    replyMode: false,
  }

  handleKeyUp = (e) => {
    console.log('here is e in keyIUp', e.type)
    const { mutate, username, commentId, publicId, tripCommentId } = this.props;
    if (e.keyCode === 13) {
      mutate({
        variables: {
          tripCommentId,
          commentId,
          publicId,
          username,
          text: e.target.value,
        },
        optimisticResponse: {
          newReply: {
            tripCommentId,
            publicId,
            commentId,
            username,
            text: e.target.value,
            _id: 'randomId2',
            __typename: 'ReplyDetails',
          },
        },
        update: (store, { data: { newReply } }) => {
          const data = store.readQuery({
            query: getReply,
            variables: {
              tripCommentId,
            },
          });
          if (!data.getReply.find((rep) => rep._id === newReply._id)) {
            data.getReply.push(newReply);
          }
          store.writeQuery({
            query: getReply,
            variables: {
              tripCommentId,
            },
            data,
          });
        },
      });
      e.target.value = '';
      this.setState({ replyMode: false });
    }
  }

  render() {
    return (
      <div className="reply-container">
        { 
          this.state.replyMode === true ? 
            <div>
              <div className="messageInput">
                <TextField
                  autoFocus
                  fullWidth
                  margin="normal"
                  id="reply"
                  label="Reply"
                  type="text"
                  name="reply"
                  onKeyUp={this.handleKeyUp}
                  // onChange={this.handleChange}
                />
              </div> 
              {/* <Button color="primary" variant="outline" size="small" onClick={this.handleKeyUp}>Reply</Button>  */}
              <Button color="primary" size="small" onClick={() => this.setState({ replyMode: false })}>Cancel</Button> 
            </div> : <Button color="primary" size="small" onClick={() => this.setState({ replyMode: true })}>Reply</Button>
        }
      </div>

    );
  }
}

const WrapedReply = graphql(newReply)(Reply);

export default WrapedReply;
