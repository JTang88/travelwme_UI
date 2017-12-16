import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import allReducers from './reducers/index';
import App from './components/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

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

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);


const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
});

const store = createStore(allReducers);

ReactDOM.render((
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>), document.getElementById('app'));
