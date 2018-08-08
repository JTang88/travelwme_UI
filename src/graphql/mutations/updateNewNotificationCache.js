import gql from 'graphql-tag';
import { getCurrentUser as query } from '../queries/getCurrentUser';

export const updateNewNotificationCache = gql`
  mutation updateNewNotificationCache($id: Int!, $newNotification: Boolean!) {
    updateNewNotificationCache(id: $id, newNotification: $newNotification) @client
  }`;

export const updateNewNotificationCacheResolver = {
  updateNewNotificationCache: (_, { id, newNotification }, { cache }) => {
    console.log('inside of updateNewNotificationCache!!=====')
    const data = cache.readQuery({ query, variables: { id } });
    data.getCurrentUser.newNotification = newNotification;
    cache.writeQuery({ query, variables: { id }, data });
  },
};