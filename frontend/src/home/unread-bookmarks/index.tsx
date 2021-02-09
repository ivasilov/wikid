import { uniqBy } from 'lodash';
import * as React from 'react';
import { useUnreadBookmarksQuery } from '../../models';
import { Bookmarks, LoadingBookmarks } from '../components/bookmarks';

export const UnreadBookmarks = () => {
  const classes = 'w-5/6 mx-auto mt-8';

  const { data, loading, fetchMore } = useUnreadBookmarksQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <LoadingBookmarks className={classes} />;
  }
  if (data?.currentUserUnreadBookmarks) {
    const cursor = data.currentUserUnreadBookmarks.cursor;

    return (
      <Bookmarks
        bookmarks={data.currentUserUnreadBookmarks.bookmarks}
        className={classes}
        fetchMore={() =>
          fetchMore({
            variables: { cursor },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              const previousEntry = previousResult.currentUserUnreadBookmarks;
              let newBookmarks = fetchMoreResult.currentUserUnreadBookmarks;
              let newCursor = fetchMoreResult.currentUserUnreadBookmarks.cursor;

              return {
                currentUserUnreadBookmarks: {
                  // By returning `cursor` here, we update the `fetchMore` function
                  // to the new cursor.
                  cursor: newCursor,
                  // Put the new comments in the front of the list
                  bookmarks: uniqBy([...previousEntry.bookmarks, ...newBookmarks.bookmarks], b => b.id),
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
