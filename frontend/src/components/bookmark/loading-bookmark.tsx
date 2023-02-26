export const LoadingBookmark = () => {
  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow flex flex-row">
      <div className="w-5 mr-5 animate-pulse bg-gray-300 my-[18px]" />
      <div className="flex flex-col w-full">
        <div className="h-5 my-2 font-bold animate-pulse max-w-md w-full bg-gray-300" />
        <span className="inline-block h-4 font-normal animate-pulse max-w-[110px] w-full bg-gray-300 my-1" />
      </div>
    </div>
  );
};
