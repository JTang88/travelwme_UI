import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

// const store = createStore();

ReactDOM.render((
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), document.getElementById('app'));
