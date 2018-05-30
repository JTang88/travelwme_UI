import React from 'react';
import { graphql } from 'react-apollo';
import { updateChatBoxState } from '../../../graphql/mutations/updateChatBoxState';

const MessageButton = ({ mutate, receiverUserId }) => {
  const handleClick = (e) => {
    e.preventDefault();
    mutate({
      variables: {
        open: true,
        currentConvoId: 'newConvo',
        currentReceiver: null,
        receiverUserId,
      },
    });
  };

  return (
    <button onClick={handleClick}>
      Message
    </button>
  );
};

const WrappedMessageButton = graphql(updateChatBoxState)(MessageButton);

export default WrappedMessageButton;