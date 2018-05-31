import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import commentAdded from '../../../../graphql/subscriptions/commentAdded';
import replyAdded from '../../../../graphql/subscriptions/replyAdded';
import getTripComments from '../../../../graphql/queries/getTripComments';
import getReply from '../../../../graphql/queries/getReply';
import Reply from './Reply';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { tripCommentId } = this.props;
    this.props.getReplyQuery.subscribeToMore({
      document: replyAdded,
      variables: {
        tripCommentId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newReply = subscriptionData.data.replyAdded;
        // don't double add the message
        if (!prev.getReply.find(rep => rep._id === newReply._id)) {
          const current = Object.assign({}, prev, {
            getReply: [...prev.getReply, newReply],
          });
          return current;
        }
        return prev;
      },
    });

    this.props.getTripCommentsQuery.subscribeToMore({
      document: commentAdded,
      variables: {
        tripCommentId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newComment = subscriptionData.data.commentAdded;
        // don't double add the message
        if (!prev.getTripComments.find(cmt => cmt._id === newComment._id)) {
          const current = Object.assign({}, prev, {
            getTripComments: [...prev.getTripComments, newComment],
          });
          return current;
        } 
        return prev;
      },
    });
  }

  render() {
    console.log('this is props in Commnet', this.props)
    return (
      <div>
        <h1>Comments</h1>
        {
          this.props.getTripCommentsQuery.loading || this.props.getReplyQuery.loading ? 'loading' :
            this.props.getTripCommentsQuery.getTripComments.map((comment, i) => 
              (
                <div key={`comment${i}`}>
                  <h3>{comment.username}</h3>:{comment.text}
                  {
                    this.props.getReplyQuery.getReply.map((reply, i) => (
                      <div key={`reply${i}`}>
                        {
                          reply.commentId === comment._id ? (
                            <div>
                              <h5>{reply.username}</h5> : {reply.text}
                            </div>
                          ) : ''
                        }
                      </div>
                    ))
                  }
                  <Reply 
                    reply={comment.reply}
                    commentId={comment._id}
                    tripCommentId={this.props.tripCommentId}
                    username={this.props.username}
                  />
                </div>
              ))
        }
      </div>
    );
  }
}

const WrapedComment = compose(
  graphql(getReply, { name: 'getReplyQuery' }),
  graphql(getTripComments, { name: 'getTripCommentsQuery' }),
)(withRouter(Comment));

export default WrapedComment;
