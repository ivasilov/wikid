import { LoadingBookmark } from '../bookmark';

export const LoadingBookmarks = (props: { className?: string }) => {
  const result: JSX.Element[] = [];

  for (let i = 0; i < 10; i++) {
    result.push(<LoadingBookmark key={i} />);
  }

  return <div className={props.className ?? ''}>{result}</div>;
};
