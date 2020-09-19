import './index.scss';
import * as React from 'react';
import { useCurrentUserBookmarkIdsQuery } from '../../models';
import { Bookmarks } from '../page/bookmarks';
import { Loading } from '../../loading';

export const AllBookmarks = () => {
  const { data, loading } = useCurrentUserBookmarkIdsQuery();

  if (loading) {
    return <Loading />;
  }

  if (data?.currentUser.bookmarks) {
    return <Bookmarks bookmarks={data?.currentUser.bookmarks} className="w-all-bookmarks mx-auto mt-8" />;
  }

  return <div>Something bad happened.</div>;
};
