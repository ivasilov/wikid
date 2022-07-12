import { Bookmarks } from '../../components/bookmarks';
import { useUnreadBookmarksQuery } from '../../models';

export default function Page() {
  const classes = 'w-5/6 mx-auto mt-8';

  const { data, loading, fetchMore, error } = useUnreadBookmarksQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  if (!error) {
    const cursor = data?.currentUserUnreadBookmarks.cursor;
    return (
      <Bookmarks
        bookmarks={data?.currentUserUnreadBookmarks.bookmarks}
        className={classes}
        loading={loading}
        fetchMore={() => fetchMore({ variables: { cursor } })}
        hasMore={!!cursor}
      />
    );
  }

  return <div>Something bad happened.</div>;
}
