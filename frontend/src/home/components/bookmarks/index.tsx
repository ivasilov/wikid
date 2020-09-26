import * as React from 'react';
import { observer } from 'mobx-react';
import { Bookmark } from '../bookmark';
import { Spinner } from '@blueprintjs/core';
import { gqlBookmarksFragmentFragment } from '../../../models';

export const Bookmarks = observer(
  (props: {
    bookmarks: gqlBookmarksFragmentFragment[];
    className?: string;
    hasMore: boolean;
    fetchMore?: () => Promise<unknown>;
  }) => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && !state.loading && props.fetchMore) {
        setState({ loading: true });
        props.fetchMore().then(() => setState({ loading: false }));
      }
    };
    const loader = React.useRef<HTMLDivElement>(null);

    const [state, setState] = React.useState({ loading: false });

    React.useEffect(() => {
      var options = {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      };
      const observer = new IntersectionObserver(handleObserver, options);
      if (loader.current) {
        observer.observe(loader.current);
      }
      return () => {
        if (loader.current) {
          observer.unobserve(loader.current);
        }
      };
    });

    return (
      <div className={props.className}>
        {props.bookmarks.map(b => (
          <Bookmark key={b.id} bookmark={b} />
        ))}

        {state.loading ? (
          <div className="flex pb-6">
            <Spinner size={30} intent="primary" className="mx-auto" />
          </div>
        ) : props.hasMore ? (
          <div className="flex pb-6" ref={loader}>
            <span className="mx-auto">Load more?</span>
          </div>
        ) : null}
      </div>
    );
  },
);
