import * as React from 'react';
import { useAllBookmarksQuery } from '../../models';
import { Bookmarks } from '../components/bookmarks';
// import { uniqBy } from 'lodash';

export const AllBookmarks = () => {
  const classes = 'w-5/6 mx-auto mt-8';

  const { data, loading, fetchMore, error } = useAllBookmarksQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  if (!error) {
    const cursor = data?.currentUserBookmarks.cursor;
    return (
      <Bookmarks
        bookmarks={data?.currentUserBookmarks.bookmarks}
        className={classes}
        loading={loading}
        fetchMore={() => fetchMore({ variables: { cursor } })}
        hasMore={!!cursor}
      />
    );
  }

  return <div>Something bad happened.</div>;
};
