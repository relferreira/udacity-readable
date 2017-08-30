import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';
import reducer from './reducers';

const client = axios.create({
  baseURL: `${process.env.API_URL}`,
  responseType: 'json'
});

const componseEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  componseEnhancers(applyMiddleware(axiosMiddleware(client)))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
