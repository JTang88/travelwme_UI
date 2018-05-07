import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloLink, split } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
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

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation,
  },
  defaults,
});

persistCache({
  cache,
  storage: localStorage,
});

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

// Set up subscription
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/subscriptions',
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, middlewareAuthLink, link]),
});

client.onResetStore(stateLink.writeDefaults);

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>), document.getElementById('app'));
