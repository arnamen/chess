import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import {rootReducer} from './redux';

import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
