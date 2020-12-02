import * as React from 'react';
import { useAllBookmarksQuery } from '../../models';
import { Bookmarks } from '../components/bookmarks';
import { Loading } from '../../loading';

export const AllBookmarks = () => {
  const { data, loading, fetchMore } = useAllBookmarksQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <Loading />;
  }
  if (data?.currentUserBookmarks) {
    const cursor = data.currentUserBookmarks.cursor;

    return (
      <Bookmarks
        bookmarks={data.currentUserBookmarks.bookmarks}
        className="w-5/6 mx-auto mt-8"
        fetchMore={() =>
          fetchMore({
            variables: { cursor },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              console.log('called');
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
