import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { showSnack } from 'react-redux-snackbar';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';
import reducer from './reducers';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  responseType: 'json',
  headers: { Authorization: '189891JHBV123KN43' }
});
const axiosMiddlewareConfig = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    response: [
      {
        error: function({ getState, dispatch, getSourceAction }, error) {
          if (error) {
            dispatch(
              showSnack('error', { label: error.message, timeout: 5000 })
            );
            return Promise.reject(error);
          }
        }
      }
    ]
  }
};

const componseEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  componseEnhancers(
    applyMiddleware(axiosMiddleware(client, axiosMiddlewareConfig))
  )
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
