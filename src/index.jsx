import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import Mutation from './graphql/mutations';
import defaults from './graphql/queries';
import App from './Components';

console.log(Mutation);

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation,
    // Mutation: {
    //   updateCurrentUser: (_, { id, username }, { cache }) => {
    //     const data = {
    //       getCurrentUser: {
    //         __typename: 'getCurrentUser',
    //         id, 
    //         username,
    //       },
    //     };
    //     cache.writeData({ data });
    //     return null;
    //   },
    //   updateCurrentTrip: (_, { id, title, cost, date_start, date_end }, { cache }) => {
    //     const data = {
    //       getCurrentTrip: {
    //         __typename: 'getCurrentTrip',
    //         id, 
    //         title,
    //         cost,
    //         date_start,
    //         date_end,
    //       },
    //     };
    //     cache.writeData({ data });
    //     return null;
    //   },
    // },
  },
  defaults,
  // defaults: {
  //   getCurrentUser: {
  //     __typename: 'getCurrentUser',
  //     id: 1,
  //     username: 'Test User',
  //   },
  //   getCurrentTrip: {
  //     __typename: 'getCurrentUser',
  //     id: 1,
  //     title: 'test trip',
  //     cost: 1,
  //     date_start: '2010-11-15',
  //     date_end: '2015-02-07',
  //   },
  // },
});

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });
const client = new ApolloClient({
  link: ApolloLink.from([stateLink, middlewareAuthLink, httpLink]),
  cache,
});

ReactDOM.render((
  <ApolloProvider client={client}>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>), document.getElementById('app'));
