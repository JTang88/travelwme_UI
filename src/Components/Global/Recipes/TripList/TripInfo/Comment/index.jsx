import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import commentAdded from '../../../../../../graphql/subscriptions/commentAdded';
import getComments from '../../../../../../graphql/queries/getComments';

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCommentsQuery.subscribeToMore({
      document: commentAdded,
      variables: {
        tripId: this.props.match.params.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log('here is prev', prev)
        if (!subscriptionData.data) {
          return prev;
        }
        const newComment = subscriptionData.data.commentAdded;
        console.log('here is new comment', newComment)
        // don't double add the message
        if (!prev.getComments.find((cmt) => cmt._id === newComment._id)) {
          const current = Object.assign({}, prev, {
            getComments: [...prev.getComments, newComment],
          });
          console.log('here is current', current);
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
                </div>
              ))
        }
      </div>
    );
  }
}

const WrapedComment = compose(
  graphql(
    getComments,
    {
      name: 'getCommentsQuery',
    },
  ),
  graphql(
    commentAdded,
    {
      name: 'commentAddedSubscription',
    },
  ),
)(withRouter(Comment));

export default WrapedComment;

// const WrapedComment = compose(
//   graphql(
//     getComments, 
//     { 
//       name: 'getCommentsQuery', 
//       options: props => ({ variables: { tripId: props.match.params.id } }), 
//     },
//   ),
//   graphql(
//     commentAdded, 
//     { 
//       name: 'commentAddedSubscription', 
//       options: props => ({ variables: { tripId: props.match.params.id } }), 
//     },
//   ),
// )(withRouter(Comment));

// export default WrapedComment;

