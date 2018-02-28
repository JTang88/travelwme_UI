import gql from 'graphql-tag';

// export default {
//   updateCurrentUser: gql`
//     mutation updateCurrentUser($id: Int!, $username: String!) {
//       updateCurrentUser(id: $id, username: $username) {
//         id
//         username
//       }
//     }
//     `,
//   updateCurrentUserResolver: () => {
//     console.log('hey this is updateCurrentUserResolver ');
//   },
// };


// const updateCurrentUser = gql`
//     mutation updateCurrentUser($id: Int!, $username: String!) {
//       updateCurrentUser(id: $id, username: $username) @client {
//         id
//         username
//       }
//     }
//     `;
// export default updateCurrentUser;


const updateCurrentUser = gql`
    mutation updateCurrentUser($id: Int!, $username: String!) {
      updateCurrentUser(id: $id, username: $username) @client
    }
    `;
export default updateCurrentUser;