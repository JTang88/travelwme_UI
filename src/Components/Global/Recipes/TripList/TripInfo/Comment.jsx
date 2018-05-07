import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const getComments = gql`
query getComments($tripId: Int!) {
  getComments(tripId: $tripId) {
    _id
    username
    text
  }
}`;

const commentAdded = gql`
  subscription commentAdded($tripId: Int!) {
    commentAdded(tripId: $tripId) {
      username
      text
    }
  }
`

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('here is props in comments', this.props)
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
              )
            )
        }
      </div>
      
    );
  }

}

// const WrapedComment = graphql(getComments, {
//   options: {
//     variables: {
//       tripId: 3,
//     },
//   },
// })(Comment);
// export default WrapedComment;

const WrapedComment = compose(
  graphql(getComments, { name: 'getCommentsQuery', options: { variables: { tripId: 3 } } }),
  graphql(commentAdded, { name: 'commentAddedSubscription', options: { variables: { tripId: 3 } } }),
)(Comment);
export default WrapedComment;

