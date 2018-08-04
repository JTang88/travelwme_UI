import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Typography, withStyles, Grid } from '@material-ui/core';
import { withRouter } from 'react-router';
import { Image } from 'cloudinary-react';
import commentAdded from '../../../../graphql/subscriptions/commentAdded';
import replyAdded from '../../../../graphql/subscriptions/replyAdded';
import getTripComments from '../../../../graphql/queries/getTripComments';
import getReply from '../../../../graphql/queries/getReply';
import AddComment from './AddComment';
import Reply from './Reply';
import './index.css';

const styles = {
  commentUsername: {
    marginLeft: 15,
    marginTop: 27,
  },
  commentTypo: {
    marginLeft: 6,
    marginTop: 30,
  },
  replyUsername: {
    marginLeft: 7,
    marginTop: 17,
  },
  replyTypo: {
    marginTop: 20,
    marginRight: 0,
  },
};

class Comment extends Component {
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
    const { classes } = this.props;
    console.log('this is props in Commnet', this.props)
    return (
      <div className="comment-section">
        <div className="comment-container">
          <div className="comment-title">
            <Typography variant="display3" color="inherit" gutterBottom>Comments</Typography>
          </div>
          <div className="comment-content-container">
            {
              this.props.getTripCommentsQuery.loading || this.props.getReplyQuery.loading ? 'loading' :
                this.props.getTripCommentsQuery.getTripComments.map((comment, i) => 
                  (
                    <div className="single-comment-reply-wrap" key={`comment${i}`}>
                      <Grid container>
                        <Grid item xs={1}>
                          <Image
                            cloudName="travelwme"
                            className="comment-pic"
                            publicId={comment.publicId}
                          />
                        </Grid> 
                        <Grid item xs={1}>
                          <Typography
                            className={classes.commentUsername}
                            variant="body2"
                            color="primary"
                            gutterBottom
                          >
                            {comment.username}: &nbsp;
                          </Typography>
                        </Grid> 
                        <Grid item xs={10}>
                          <Typography
                            className={classes.commentTypo}
                            variant="body1"
                            color="inherit"
                            gutterBottom
                          >
                            {` ${comment.text}`}
                          </Typography>
                        </Grid> 
                      </Grid>
                      {
                        this.props.getReplyQuery.getReply.map((reply, i) => (
                          <div key={`reply${i}`}>
                            {
                              reply.commentId === comment._id ? (
                                <Grid container>
                                  <Grid item xs={1}>
                                    <div />
                                  </Grid> 
                                  <Grid item xs={1}>
                                    <Image
                                      cloudName="travelwme"
                                      className="reply-pic"
                                      publicId={reply.publicId}
                                    />
                                  </Grid>
                                  <Grid item xs={1}>
                                    <Typography
                                      className={classes.replyUsername}
                                      variant="body2"
                                      color="secondary"
                                      gutterBottom
                                    >
                                      {reply.username}: &nbsp;
                                    </Typography>
                                  </Grid> 
                                  <Grid item xs={9}>
                                    <Typography
                                      className={classes.replyTypo}
                                      variant="body1"
                                      color="inherit"
                                      gutterBottom
                                    >
                                      {` ${reply.text}`}
                                    </Typography>
                                  </Grid> 
                                </Grid>                                    
                              ) : ''
                            }
                          </div>
                        ))
                      }                       
                      <Reply 
                        reply={comment.reply}
                        commentId={comment._id}
                        tripCommentId={this.props.tripCommentId}
                        username={this.props.user.username}
                        publicId={this.props.user.publicId}
                      />
                    </div>
                  ))
            }
            <AddComment
              username={this.props.user.username}
              publicId={this.props.user.publicId}
              tripCommentId={this.props.tripCommentId}
            />
          </div>
        </div>
      </div>    
    );
  }
}

const WrapedComment = compose(
  graphql(getReply, { name: 'getReplyQuery' }),
  graphql(getTripComments, { name: 'getTripCommentsQuery' }),
)(withRouter(withStyles(styles)(Comment)));

export default WrapedComment;


// return (
//   <div className="comment-section">
//     <div className="comment-container">
//       <div className="comment-title">
//         <Typography variant="display3" color="inherit" gutterBottom>Comments</Typography>
//       </div>
//       <div className="comment-content-container">
//         {
//           this.props.getTripCommentsQuery.loading || this.props.getReplyQuery.loading ? 'loading' :
//             this.props.getTripCommentsQuery.getTripComments.map((comment, i) =>
//               (
//                 <div key={`comment${i}`}>
//                   <h3>{comment.user.username}</h3>:{comment.text}
//                   {
//                     this.props.getReplyQuery.getReply.map((reply, i) => (
//                       <div key={`reply${i}`}>
//                         {
//                           reply.commentId === comment._id ? (
//                             <div>
//                               <h5>{reply.user.username}</h5> : {reply.text}
//                             </div>
//                           ) : ''
//                         }
//                       </div>
//                     ))
//                   }
//                   <Reply
//                     reply={comment.reply}
//                     commentId={comment._id}
//                     tripCommentId={this.props.tripCommentId}
//                     userId={this.props.userId}
//                   />
//                 </div>
//               ))
//         }
//       </div>
//       <AddComment
//         userId={this.props.userId}
//         tripCommentId={this.props.tripCommentId}
//       />
//     </div>
//   </div>
// );