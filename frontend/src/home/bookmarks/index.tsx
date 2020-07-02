import './index.scss';
import * as React from 'react';
import { useCurrentUserBookmarkIdsQuery } from '../../models';
import { Bookmark } from '../page/bookmark';
import { Bookmarks } from '../page/bookmarks';

export const AllBookmarks = () => {
  const { data, loading, error } = useCurrentUserBookmarkIdsQuery();

  if (loading) {
    return <div>Loading</div>;
  }

  if (data?.currentUser.bookmarks) {
    return <Bookmarks bookmarks={data?.currentUser.bookmarks} className="w-all-bookmarks mx-auto mt-8" />;
  }

  return <div>Something bad happened.</div>;
};
