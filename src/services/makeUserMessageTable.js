const makeUserMessageTable = (convo) => {
  const result = {};
  for (let i = 0; i < convo.users.length; i++) {
    result[convo.users[i].id] = convo.users[i].publicId;
  }
  console.log('here is result', result)
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
//       userId
//     }
//   }
// }`;