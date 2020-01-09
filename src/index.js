import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-common';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import client from './apollo-client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
