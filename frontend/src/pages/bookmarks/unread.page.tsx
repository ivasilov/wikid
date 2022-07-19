import { Bookmarks } from '../../components/bookmarks';
import { useUnreadBookmarksQuery } from '../../models';

export default function Page() {
  const classes = 'container pt-8 px-6';

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
