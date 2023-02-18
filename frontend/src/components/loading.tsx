import { Spinner } from '../components';

export const Loading = () => {
  return (
    <div className="grow flex h-full">
      <div className="self-center mx-auto">
        <Spinner size="3x" />
      </div>
    </div>
  );
};
