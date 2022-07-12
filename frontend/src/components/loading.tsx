import { Spinner } from './spinner';

export const Loading = () => {
  return (
    <div className="container mx-auto h-screen flex">
      <div className="self-center mx-auto">
        <Spinner />
      </div>
    </div>
  );
};
