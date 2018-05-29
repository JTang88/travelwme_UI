import gql from 'graphql-tag';

export const updateChatBoxState = gql`
    mutation updateChatBoxState($open: Boolean!, $currentConvoId: String, $currentReceiver: String, $receiverUserId: Int) {
      updateChatBoxState(open: $open, currentConvoId: $currentConvoId, currentReceiver: $currentReceiver, receiverUserId: $receiverUserId) @client
    }`;

export const updateChatBoxStateResolver = {
  updateChatBoxState: (_, { open, currentConvoId, currentReceiver, receiverUserId }, { cache }) => {
    const data = {
      getChatBoxState: {
        __typename: 'getChatBoxState',
        open,
        currentConvoId,
        currentReceiver,
        receiverUserId,
      },
    };
    cache.writeData({ data });
    return null;
  },
};
