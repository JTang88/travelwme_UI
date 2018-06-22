const makeUserMessageTable = (convo) => {
  const result = {};
  for (let i = 0; i < convo.users.length; i++) {
    result[convo.users[i].username] = convo.users[i].publicId;
  }
  return result;
};

export default makeUserMessageTable;

// const getConvo = gql`
// query getConvo($convoId: String!) {
//   getConvo(convoId: $convoId) {
//     _id
//     users {
//       id
//       username
//       publicId
//     }
//     msgs {
//       _id
//       text
//       username
//     }
//   }
// }`;