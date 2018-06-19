import React from 'react';
import { Button } from '@material-ui/core';  
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
    <Button 
      onClick={handleClick}
      size="small"
      variant="outlined"
      color="secondary"
    >
      Message
    </Button>
  );
};

const WrappedMessageButton = graphql(updateChatBoxState)(MessageButton);

export default WrappedMessageButton;