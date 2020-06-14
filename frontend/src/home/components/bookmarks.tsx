import * as React from 'react';
import { observer } from 'mobx-react';
import { BookmarkItem } from './bookmarkItem';
import { Paginated } from './paginated';
import { useCurrentUserBookmarkIdsQuery, gqlBookmark } from '../../models';
import { observable, action } from 'mobx';
import { useStateTransient } from './utils';
import { DeleteBookmarkDialog } from './deleteBookmark';
import { EditBookmarkDialog } from './editBookmark';

class BookmarkItemState {
  @observable editBookmarkDialogShown = false;
  @observable deleteBookmarkDialogShown = false;
  @observable bookmark: gqlBookmark | null = null;

  @action toggleEditBookmarkDialog = (b?: any) => {
    if (b) {
      this.bookmark = b;
    }
    this.editBookmarkDialogShown = !this.editBookmarkDialogShown;
  };

  @action toggleDeleteBookmarkDialog = (b?: any) => {
    if (b) {
      this.bookmark = b;
    }
    this.deleteBookmarkDialogShown = !this.deleteBookmarkDialogShown;
  };
}

export const Bookmarks = observer(() => {
  const state = useStateTransient(() => new BookmarkItemState(), []);
  const { data, loading } = useCurrentUserBookmarkIdsQuery();

  if (loading) {
    return <div>Loading</div>;
  } else if (data) {
    const ids = data.currentUser?.bookmarks.map(b => b.id) || [];
    return (
      <>
        <h1>Bookmarks</h1>
        <Paginated
          ids={ids}
          itemsPerPage={5}
          itemRenderer={id => (
            <BookmarkItem
              key={id}
              id={id}
              onEditBookmark={state.toggleEditBookmarkDialog}
              onDeleteBookmark={state.toggleDeleteBookmarkDialog}
            />
          )}
        />
      </>
    );
  } else {
    return null;
  }
});
