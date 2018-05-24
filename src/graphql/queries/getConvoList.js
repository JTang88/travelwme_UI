import gql from 'graphql-tag';

const getConvoList = gql`
query getConvoList($convoListId: String!) {
  getConvoList(convoListId: $convoListId) {
    convoIds {
      convoId
    }
  }
}`;

export default getConvoList;

// getConvoList(convoListId: String!): ConvoList

// const ConvoList = `
//   type ConvoList {
//     _id: String!
//     convoIds: [ConvoId]
//   }`;