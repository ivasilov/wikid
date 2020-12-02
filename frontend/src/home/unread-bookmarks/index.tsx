import * as React from 'react';
import { useUnreadBookmarksQuery } from '../../models';
import { Bookmarks } from '../components/bookmarks';
import { Loading } from '../../loading';

export const UnreadBookmarks = () => {
  const { data, loading, fetchMore } = useUnreadBookmarksQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <Loading />;
  }
  if (data?.currentUserUnreadBookmarks) {
    const cursor = data.currentUserUnreadBookmarks.cursor;

    return (
      <Bookmarks
        bookmarks={data.currentUserUnreadBookmarks.bookmarks}
        className="w-5/6 mx-auto mt-8"
        fetchMore={() =>
          fetchMore({
            variables: { cursor },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              const previousEntry = previousResult.currentUserUnreadBookmarks;
              let newBookmarks = fetchMoreResult.currentUserUnreadBookmarks.bookmarks;
              let newCursor = fetchMoreResult.currentUserUnreadBookmarks.cursor;

              return {
                currentUserUnreadBookmarks: {
                  // By returning `cursor` here, we update the `fetchMore` function
                  // to the new cursor.
                  cursor: newCursor,
                  // Put the new comments in the front of the list
                  bookmarks: [...previousEntry.bookmarks, ...newBookmarks],
                  __typename: previousEntry.__typename,
                },
              };
            },
          })
        }
        hasMore={!!cursor}
      />
    );
  }

  return <div>Something bad happened.</div>;
};
