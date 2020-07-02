import * as React from 'react';
import { observer } from 'mobx-react';
import { Bookmark } from './bookmark';

export const Bookmarks = observer((props: { bookmarks: { id: string }[]; className?: string }) => {
  return (
    <div className={props.className}>
      {props.bookmarks.map(b => (
        <Bookmark key={b.id} id={b.id} />
      ))}
    </div>
  );
});
