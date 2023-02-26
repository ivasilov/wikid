import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import merge from 'deepmerge';
import { extractFiles } from 'extract-files';
import { isEqual } from 'lodash';
import { useMemo } from 'react';
import { typePolicies } from './type-policies';

const uploadAndBatchHTTPLink = (opts: any) =>
  ApolloLink.split(operation => extractFiles(operation).files.size > 0, createUploadLink(opts), new HttpLink(opts));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

/**
 * Creates an isomorphic Apollo client.
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: from([errorLink])
      .concat(
        setContext((_, { headers }) => {
          let token: string | null = null;
          if (typeof window !== 'undefined') {
            token = localStorage.getItem('accessToken');
          }
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          };
        }),
      )
      .concat(uploadAndBatchHTTPLink({ uri: 'http://127.0.0.1:4000/api' })),
    cache: new InMemoryCache({
      typePolicies,
    }),
  });
}

/**
 * Creates an isomorphic Apollo client or returns it from cache.
 */
export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _client.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache. This overrides whatever is
    // browser cache with what came in through server props because that info is newer.
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    _client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _client;
  }

  return _client;
}

/**
 * Will update the Apollo cache only when the initial state changes
 * othrewise return the existing apollo client.
 */
export function useApollo(initialState: {}) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
