export const LoadingBookmark = () => {
  return (
    <div className="w-bookmark-loading flex pb-6">
      <img className="w-5 object-contain mr-5 bp3-skeleton" alt="bookmark favicon" />
      <div>
        <div className="h-6 font-bold bp3-skeleton">Skeleton text bookmark name</div>
        <span className="inline h-4 font-normal bp3-skeleton">Skeleton text url</span>
      </div>
    </div>
  );
};
