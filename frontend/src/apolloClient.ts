import { Service } from 'typedi';
import { ApolloClient,ApolloLink } from '@apollo/client';
import {  InMemoryCache } from '@apollo/client/cache';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

export const GraphQLClient = Service(
  () =>
    new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
              console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
      ])
        .concat(
          setContext((_, { headers }) => {
            const token = localStorage.getItem('accessToken');
            return {
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
              },
            };
          }),
        )
        .concat(new BatchHttpLink({ uri: '/api' })),
      cache: new InMemoryCache(),
    }),
);
