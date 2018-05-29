import React from 'react';
import { graphql, compose } from 'react-apollo';
import newConvo from '../../../graphql/mutations/newConvo';
import newMsg from '../../../graphql/mutations/newMsg';
import { getCurrentUser } from '../../../graphql/queries/getCurrentUser';
import { getChatBoxState } from '../../../graphql/queries/getChatBoxState';
import { updateChatBoxState } from '../../../graphql/mutations/updateChatBoxState';
import getConvoList from '../../../graphql/queries/getConvoList';
import getConvo from '../../../graphql/queries/getConvo';

const AddMessage = ({ 
  newConvoMutation, 
  newMsgMutation, 
  getChatBoxStateQuery: {
    getChatBoxState: {
      receiverUserId,
      currentConvoId,
    },
  },
  getCurrentUserQuery: { 
    getCurrentUser: {
      convoListId,
      username,
      id,
    },
  }, 
}) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && currentConvoId === 'newConvo') {
      newConvoMutation({
        variables: {
          convoListId, 
          username,
          userId: id,
          receiverUserId,
          text: e.target.value,
        },
        update: (store, { data: { newConvo } }) => {
          const data = store.readQuery({
            query: getConvoList,
            variables: {
              convoListId,
            },
          });
          if (!data.getConvoList.convoIds.find(convoId => convoId === newConvo)) {
            data.getConvoList.convoIds.push(newConvo);
          }
          store.writeQuery({
            query: getConvoList,
            variables: {
              convoListId,
            },
            data,
          });
        },
      });
      e.target.value = '';
    }
    // $username: String! , $text: String! , $convoId: String!)
    if (e.keyCode === 13 && currentConvoId !== 'newConvo') {
      const convoId = currentConvoId;
      newMsgMutation({
        variables: {
          username,
          convoId,
          text: e.target.value,
        },
        update: (store, { data: { newMsg } }) => {
          const data = store.readQuery({
            query: getConvo,
            variables: {
              convoId,
            },
          });
          if (!data.getConvo.msgs.find(msg => msg._id === newMsg._id)) {
            data.getConvo.msgs.push(newMsg);
          }
          store.writeQuery({
            query: getConvo,
            variables: {
              convoId,
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


const WrapedAddMessage = compose(
  graphql(getCurrentUser, { name: 'getCurrentUserQuery' }),
  graphql(getChatBoxState, { name: 'getChatBoxStateQuery' }),
  graphql(newConvo, { name: 'newConvoMutation' }),
  graphql(newMsg, { name: 'newMsgMutation' }),
  graphql(updateChatBoxState, { name: 'updateChatBoxStateMutation' }),
)(AddMessage);


export default WrapedAddMessage;