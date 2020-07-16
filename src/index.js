import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from './store.js';
import App from './App';

import './styles/index.css';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
