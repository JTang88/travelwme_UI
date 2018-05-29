import gql from 'graphql-tag';

export const getChatBoxState = gql`
  query getChatBoxState {
    getChatBoxState @client {
      open
      currentConvoId
      currentReceiver
      receiverUserId
    }
  }`;
export const getChatBoxStateDefault = {
  getChatBoxState: {
    __typename: 'getChatBoxState',
    open: false,
    currentConvoId: null,
    currentReceiver: null,
    receiverUserId: null,
  },
};

// import gql from 'graphql-tag';

// export const updateChatBoxState = gql`
//     mutation updateChatBoxState($status: Boolean!) {
//       updateChatBoxState(status: $status) @client
//     }`;

// export const updateChatBoxStateResolver = {
//   updateChatBoxState: (_, { status }, { cache }) => {
//     const data = {
//       getchatBoxState: {
//         __typename: 'getchatBoxState',
//         status,
//       },
//     };
//     cache.writeData({ data });
//     return null;
//   },
// };