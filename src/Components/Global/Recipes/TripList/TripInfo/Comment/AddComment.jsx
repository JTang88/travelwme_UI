import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import newComment from '../../../../../../graphql/mutations/newComment';
import getComments from '../../../../../../graphql/queries/getComments';

const AddComment = ({ mutate, match, username }) => {
  console.log('this is match in AddComment', username)
  const tripId = Number(match.params.id);
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      mutate({
        variables: {
          username,
          tripId,
          text: e.target.value,
        },
        optimisticResponse: {
          newComment: {
            text: e.target.value,
            username,
            _id: 'randomId',
            __typename: 'Comment',
          },
        },
        update: (store, { data: { newComment } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: getComments,
            variables: {
              tripId,
            },
          });

          // don't double add the message
          if (!data.getComments.find((msg) => msg._id === newComment._id)) {
            // Add our Message from the mutation to the end.
            data.getComments.push(newComment);
          }
          // Write the data back to the cache.
          store.writeQuery({
            query: getComments,
            variables: {
              tripId,
            },
            data
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


const WrapedAddComment = graphql(
  newComment,
)(withRouter(AddComment));

export default WrapedAddComment;