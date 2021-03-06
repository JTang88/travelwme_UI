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
import { MuiThemeProvider } from '@material-ui/core/styles';
import Mutation from './graphql/mutations';
import defaults from './graphql/queries';
import App from './Components/App.js';
import theme from './theme';

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token');
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
  storage: sessionStorage,
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_SERVER_URL });

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTIONS_URL,
  options: {
    reconnect: true,
  },
});

const link = split(
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
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>), document.getElementById('app'));
