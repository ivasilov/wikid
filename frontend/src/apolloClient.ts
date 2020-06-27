import { Service } from 'typedi';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

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
