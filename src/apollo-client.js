import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

import auth from './utils/auth';

const httpLink = new HttpLink({ uri: `${process.env.STRAPI_URL}/graphql` });

// Middleware to set the headers
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = auth.getToken();
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

// Disable cache so it reflects the updates
// If you're just displaying data and not mutating them you can remove it
// to increase performances
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: concat(middlewareAuthLink, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
