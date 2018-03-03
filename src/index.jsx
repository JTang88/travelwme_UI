import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import App from './Components';

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
    Mutation: {
      updateCurrentUser: (_, { id, username }, { cache }) => {
        const data = {
          getCurrentUser: {
            __typename: 'getCurrentUser',
            id, 
            username,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
  defaults: {
    getCurrentUser: {
      __typename: 'getCurrentUser',
      id: 1,
      username: 'Test User',
    },
  },
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
