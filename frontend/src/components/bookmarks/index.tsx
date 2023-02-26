import { isBoolean } from 'lodash';
import { gqlBookmarksFragmentFragment } from '../../models';
import { Bookmark } from '../bookmark';
import { LoadMoreBookmarks, LoadMoreBookmarksProps } from './load-more-bookmarks';
import { LoadingBookmarks } from './loading';

type OnlyBookmarksProps = {
  className?: string;
  bookmarks?: gqlBookmarksFragmentFragment[];
};

type LoadingBookmarksProps = {
  className?: string;
  bookmarks?: gqlBookmarksFragmentFragment[];
} & LoadMoreBookmarksProps;

const isLoadingBookmarksProps = (a: any): a is LoadMoreBookmarksProps => {
  if (isBoolean(a.hasMore) && isBoolean(a.loading) && a.fetchMore) {
    return true;
  }
  return false;
};

type BookmarksProps = OnlyBookmarksProps | LoadingBookmarksProps;

export const Bookmarks = (props: BookmarksProps) => {
  const { className, bookmarks } = props;

  if (isLoadingBookmarksProps(props)) {
    if (props.loading && (!bookmarks || bookmarks.length === 0)) {
      return <LoadingBookmarks className={className} />;
    }
  }

  return (
    <div className={className}>
      {(bookmarks ?? []).map(b => (
        <Bookmark key={b.id} bookmark={b} />
      ))}
      {isLoadingBookmarksProps(props) ? <LoadMoreBookmarks {...props} /> : null}
    </div>
  );
};
