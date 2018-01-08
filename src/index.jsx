import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/lib/storage'
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
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

const config = {
  key: 'root',
  storage,
};

const reducer = persistCombineReducers(config, allReducers);

const configureStore = () => {
  const store = createStore(reducer);
  const persistor = persistStore(store);
  return { persistor, store };
};

const { store } = configureStore();
const { persistor } = configureStore();

ReactDOM.render((
  <ApolloProvider client={client}>  
    <Provider store={store}>
      <PersistGate 
        loading={null}
        onBeforeLift={null}
        persistor={persistor}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ApolloProvider>), document.getElementById('app'));
