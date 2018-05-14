import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import commentAdded from '../../../../../../graphql/subscriptions/commentAdded';
import replyAdded from '../../../../../../graphql/subscriptions/replyAdded';
import getComments from '../../../../../../graphql/queries/getComments';
// import getReply from '../../../../../../graphql/queries/getReply';
import Reply from './Reply';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCommentsQuery.subscribeToMore({
      document: replyAdded,
      variables: {
        tripId: this.props.match.params.id,
      },
      update: (store, { subscriptionData }) => {
        console.log('It is in here')
      },
    });

    this.props.getCommentsQuery.subscribeToMore({
      document: commentAdded,
      variables: {
        tripId: this.props.match.params.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newComment = subscriptionData.data.commentAdded;
        // don't double add the message
        if (!prev.getComments.find((cmt) => cmt._id === newComment._id)) {
          console.log('this is prev.getCommnets', prev.getComments)
          const current = Object.assign({}, prev, {
            getComments: [...prev.getComments, newComment],
          });
          return current;
        } 
        return prev;
      },
    });
  }

  render() {
    console.log('here is props in comments', this.props);
    return (
      <div>
        <h1>Comments</h1>
        {
          this.props.getCommentsQuery.loading ? 'loading' :
            this.props.getCommentsQuery.getComments.map(comment => 
              (
                <div>
                  <h3>{comment.username}</h3>:{comment.text}
                  <Reply 
                    reply={comment.reply}
                    commentId={comment._id}
                    tripId={Number(this.props.match.params.id)}
                    username={this.props.username}
                  />
                </div>
              ))
        }
      </div>
    );
  }
}

const WrapedComment = graphql(getComments, { name: 'getCommentsQuery' })(withRouter(Comment));

export default WrapedComment;
