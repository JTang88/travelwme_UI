import gql from 'graphql-tag';
import { getCurrentUser as query } from '../queries/getCurrentUser';

export const updateNewMessageStateCache = gql`
  mutation updateNewMessageStateCache($id: Int!, $newMessage: Boolean!) {
    updateNewMessageStateCache(id: $id, newMessage: $newMessage) @client
  }`;

export const updateNewMessageStateCacheResolver = {
  updateNewMessageStateCache: (_, { id, newMessage }, { cache }) => {
    const data = cache.readQuery({ query, variables: { id } });
    data.getCurrentUser.newMessage = newMessage;
    cache.writeQuery({ query, variables: { id }, data });
  },
};