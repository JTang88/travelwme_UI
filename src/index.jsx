import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import Mutation from './graphql/mutations';
import defaults from './graphql/queries';
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

persistCache({
  cache,
  storage: localStorage,
});

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation,
  },
  defaults,
});

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, middlewareAuthLink, httpLink]),
});

client.onResetStore(stateLink.writeDefaults);

ReactDOM.render((
  <ApolloProvider client={client}>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>), document.getElementById('app'));
