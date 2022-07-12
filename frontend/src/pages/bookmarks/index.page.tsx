import { Bookmarks } from '../../components/bookmarks';
import { useAllBookmarksQuery } from '../../models';

export default function Page() {
  const classes = 'container pt-8 px-6';

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
}
