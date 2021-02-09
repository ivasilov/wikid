import * as React from 'react';
import { useAllBookmarksQuery } from '../../models';
import { Bookmarks, LoadingBookmarks } from '../components/bookmarks';
import { uniqBy } from 'lodash';

export const AllBookmarks = () => {
  const classes = 'w-5/6 mx-auto mt-8';

  const { data, loading, fetchMore } = useAllBookmarksQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <LoadingBookmarks className={classes} />;
  }
  if (data?.currentUserBookmarks) {
    const cursor = data.currentUserBookmarks.cursor;

    return (
      <Bookmarks
        bookmarks={data.currentUserBookmarks.bookmarks}
        className={classes}
        fetchMore={() =>
          fetchMore({
            variables: { cursor },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return previousResult;
              }
              const previousEntry = previousResult.currentUserBookmarks;
              let newBookmarks = fetchMoreResult.currentUserBookmarks.bookmarks;
              let newCursor = fetchMoreResult.currentUserBookmarks.cursor;

              return {
                currentUserBookmarks: {
                  // By returning `cursor` here, we update the `fetchMore` function
                  // to the new cursor.
                  cursor: newCursor,
                  // Put the new comments in the front of the list
                  bookmarks: uniqBy([...previousEntry.bookmarks, ...newBookmarks], b => b.id),
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
