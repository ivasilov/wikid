import { FieldMergeFunction } from '@apollo/client';
import { uniqBy } from 'lodash';
import { gqlBookmark, gqlPaginatedBookmarks, StrictTypedTypePolicies } from '../models';

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

export const typePolicies: StrictTypedTypePolicies = {
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
