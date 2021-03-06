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
      id,
    },
  }, 
}) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && currentConvoId === 'newConvo') {
      newConvoMutation({
        variables: {
          convoListId, 
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
    if (e.keyCode === 13 && currentConvoId !== 'newConvo') {
      const convoId = currentConvoId;
      newMsgMutation({
        variables: {
          receiverUserId,
          userId: id,
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

  console.log('render AddMessage');

  return (
    <input
      className="input-box"
      type="text"
      placeholder="New message"
      onKeyUp={handleKeyUp}
    />
  );
};


const WrapedAddMessage = compose(
  graphql(getCurrentUser, { 
    name: 'getCurrentUserQuery',
    options: props => ({
      variables: { id: Number(sessionStorage.getItem('currentUserId')) },
    }), 
  }),
  graphql(getChatBoxState, { name: 'getChatBoxStateQuery' }),
  graphql(newConvo, { name: 'newConvoMutation' }),
  graphql(newMsg, { name: 'newMsgMutation' }),
  graphql(updateChatBoxState, { name: 'updateChatBoxStateMutation' }),
)(AddMessage);


export default WrapedAddMessage;