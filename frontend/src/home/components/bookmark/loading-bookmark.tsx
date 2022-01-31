import * as React from 'react';

export const LoadingBookmark = () => {
  return (
    <div className="w-bookmark-loading flex pb-6">
      <img className="w-favicon mr-5 bp3-skeleton" alt="bookmark favicon" />
      <div>
        <div className="w-bookmark-name font-bold bp3-skeleton">Skeleton text bookmark name</div>
        <span className="w-bookmark-url font-normal bp3-skeleton">Skeleton text url</span>
      </div>
    </div>
  );
};
