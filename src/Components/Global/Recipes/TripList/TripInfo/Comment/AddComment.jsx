import React from 'react';
import { graphql } from 'react-apollo';
// import { withRouter } from 'react-router';
import newComment from '../../../../../../graphql/mutations/newComment';
import getTripComments from '../../../../../../graphql/queries/getTripComments';

const AddComment = ({ mutate, username, tripCommentId }) => {
  console.log('this is match in AddComment', username)
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate({
        variables: {
          username,
          tripCommentId,
          text: e.target.value,
        },
        optimisticResponse: {
          newComment: {
            text: e.target.value,
            username,
            _id: 'randomId',
            __typename: 'TripComment',
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
    <div className="messageInput">
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};


const WrapedAddComment = graphql(newComment)(AddComment);

export default WrapedAddComment;