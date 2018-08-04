import React from 'react';
import { graphql } from 'react-apollo';
import { TextField } from '@material-ui/core';
import newComment from '../../../../graphql/mutations/newComment';
import getTripComments from '../../../../graphql/queries/getTripComments';

const AddComment = ({ mutate, username, publicId, tripCommentId }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate({
        variables: {
          username,
          tripCommentId,
          publicId,
          text: e.target.value,
        },
        optimisticResponse: {
          newComment: {
            text: e.target.value,
            username,
            publicId,
            _id: 'randomId',
            __typename: 'CommentDetails',
          },
        },
        update: (store, { data: { newComment } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: getTripComments,
            variables: {
              tripCommentId,
            },
          });

          // don't double add the message
          if (!data.getTripComments.find((msg) => msg._id === newComment._id)) {
            // Add our Message from the mutation to the end.
            data.getTripComments.push(newComment);
          }
          // Write the data back to the cache.
          store.writeQuery({
            query: getTripComments,
            variables: {
              tripCommentId,
            },
            data,
          });
        },
      });
      e.target.value = '';
    }
  };

  return (
    <div className="comment-Input">
      <TextField
        fullWidth
        margin="normal"
        id="comment"
        label="Comment"
        type="text"
        name="comment"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};


const WrapedAddComment = graphql(newComment)(AddComment);

export default WrapedAddComment;