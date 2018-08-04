import React from 'react';
import { IconButton } from '@material-ui/core';
import { Message } from '@material-ui/icons';  
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
    <IconButton 
      onClick={handleClick}
      size="small"
      color="primary"
    >
      <Message />
    </IconButton>
  );
};

const WrappedMessageButton = graphql(updateChatBoxState)(MessageButton);

export default WrappedMessageButton;