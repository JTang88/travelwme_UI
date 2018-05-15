import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getReply from '../../../../../../graphql/queries/getReply';
import newReply from '../../../../../../graphql/mutations/newReply';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyMode: false,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    const { mutate, username, commentId, tripId } = this.props;
    if (e.keyCode === 13) {
      mutate({
        variables: {
          tripId,
          commentId,
          username,
          text: e.target.value,
        },
        optimisticResponse: {
          newReply: {
            tripId,
            commentId,
            username,
            text: e.target.value,
            _id: 'randomId2',
            __typename: 'Reply',
          },
        },
        update: (store, { data: { newReply } }) => {
          const data = store.readQuery({
            query: getReply,
            variables: {
              tripId,
            },
          });
          if (!data.getReply.find((rep) => rep._id === newReply._id)) {
            data.getReply.push(newReply);
          }
          store.writeQuery({
            query: getReply,
            variables: {
              tripId,
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
      <div>
        { 
          this.state.replyMode === true ? 
            <div>
              <div className="messageInput">
                <input
                  type="text"
                  placeholder="reply"
                  onKeyUp={this.handleKeyUp}
                />
              </div> 
              <button onClick={this.handleKeyUp}>Reply</button> 
            </div> : <button onClick={() => this.setState({ replyMode: true })}>Reply</button>
        }
      </div>

    );
  }
}

const WrapedReply = graphql(newReply)(Reply);

export default WrapedReply;
