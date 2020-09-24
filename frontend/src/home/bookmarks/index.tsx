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

  if (data?.currentUserBookmarks) {
    return <Bookmarks bookmarks={data.currentUserBookmarks} className="w-all-bookmarks mx-auto mt-8" />;
  }

  return <div>Something bad happened.</div>;
};
