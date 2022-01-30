import * as React from 'react';
import { Spinner } from '@blueprintjs/core';

export type LoadMoreBookmarksProps = { hasMore: boolean; loading: boolean; fetchMore: () => Promise<unknown> };

export const LoadMoreBookmarks = (props: LoadMoreBookmarksProps) => {
  const { hasMore, loading, fetchMore } = props;
  const loader = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const currentEl = loader.current;
    if (currentEl) {
      var options = {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      };
      const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0];
        if (target.isIntersecting && fetchMore) {
          fetchMore();
        }
      };

      const observer = new IntersectionObserver(handleObserver, options);
      if (currentEl) {
        observer.observe(currentEl);
      }
      return () => {
        if (currentEl) {
          observer.unobserve(currentEl);
        }
      };
    }
  }, [fetchMore]);

  if (loading) {
    return (
      <div className="flex pb-6">
        <Spinner size={30} intent="primary" className="mx-auto" />
      </div>
    );
  }
  if (hasMore) {
    return (
      <div className="flex pb-6" ref={loader}>
        <span className="mx-auto">Load more?</span>
      </div>
    );
  }
  return null;
};
