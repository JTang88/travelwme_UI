import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import getComments from '../../../../../../graphql/queries/getComments';

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
            query: getComments,
            variables: {
              tripId,
            },
          });

          data.getComments.find((cmt) => {
            if (cmt._id === commentId) {
              if (!cmt.reply.find(rep => rep._id === newReply._id)) {
                cmt.reply.push(newReply);
              }
            }
          });

          store.writeQuery({
            query: getComments,
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
          this.props.reply.map(rep =>  
            (
              <div>
                <h5>{rep.username}</h5>
                <p>{rep.text}</p>
              </div>
            ))
        }

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

const newReply = gql`
  mutation newReply($tripId: Int!, $commentId: String!, $username: String!, $text: String!) {
    newReply(tripId: $tripId, commentId: $commentId, username: $username, text: $text) {
      tripId
      commentId
      _id
      text
      username
    }
  }
`;


const WrapedReply = graphql(newReply)(Reply);

export default WrapedReply;
