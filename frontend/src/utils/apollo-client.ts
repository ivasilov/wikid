import { Service } from 'typedi';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { FieldMergeFunction } from '@apollo/client/cache';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { extractFiles } from 'extract-files';
import { uniqBy } from 'lodash';

import { gqlBookmark, gqlPaginatedBookmarks, StrictTypedTypePolicies } from '../models';

const uploadAndBatchHTTPLink = (opts: any) =>
  ApolloLink.split(
    operation => extractFiles(operation).files.size > 0,
    createUploadLink(opts),
    new BatchHttpLink(opts),
  );

const mergeBookmarks: FieldMergeFunction<gqlPaginatedBookmarks, gqlPaginatedBookmarks> = (e, i) => {
  const existing: gqlPaginatedBookmarks = e ?? { __typename: 'paginatedBookmarks', bookmarks: [], cursor: undefined };
  const incoming: gqlPaginatedBookmarks = i ?? { __typename: 'paginatedBookmarks', bookmarks: [], cursor: undefined };
  const merged = uniqBy(existing.bookmarks.concat(incoming.bookmarks), i => (i as any).__ref) as gqlBookmark[];
  return {
    __typename: 'paginatedBookmarks',
    bookmarks: merged,
    cursor: incoming.cursor,
  };
};

const typePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      currentUserBookmarks: {
        keyArgs: false,
        merge: mergeBookmarks,
      },
      currentUserUnreadBookmarks: {
        keyArgs: false,
        merge: mergeBookmarks,
      },
    },
  },
};

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
        .concat(uploadAndBatchHTTPLink({ uri: '/api' })),
      cache: new InMemoryCache({
        typePolicies,
      }),
    }),
);
