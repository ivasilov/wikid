import * as React from 'react';
import { observer } from 'mobx-react';
import { Dialog, Button, Classes } from '@blueprintjs/core';
import {
  useDeleteBookmarkMutation,
  CurrentUserBookmarkIdsDocument,
  gqlCurrentUserBookmarkIdsQuery,
} from '../../models';

interface Props {
  bookmark: { id: string; name: string };
  onClose: () => void;
}

export const DeleteBookmarkDialog = observer((props: Props) => {
  const [update, { loading }] = useDeleteBookmarkMutation({
    variables: { id: props.bookmark.id },
    update: (cache, { data }) => {
      const bs = cache.readQuery({
        query: CurrentUserBookmarkIdsDocument,
      }) as gqlCurrentUserBookmarkIdsQuery;
      const filtered = bs.currentUser?.bookmarks.filter(b => b.id !== data?.deleteBookmark);

      cache.writeQuery({
        query: CurrentUserBookmarkIdsDocument,
        data: {
          currentUser: {
            __typename: bs.currentUser?.__typename,
            id: bs.currentUser?.id,
            bookmarks: filtered,
          },
        },
      });
    },
    onCompleted: () => props.onClose(),
  });

  return (
    <Dialog isOpen icon="info-sign" title="Delete bookmark" onClose={props.onClose}>
      <div className={Classes.DIALOG_BODY}>
        Are you sure you want to delete <span style={{ color: 'orange' }}>{props.bookmark.name}</span>?
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={props.onClose} loading={loading}>
            Cancel
          </Button>
          <Button intent="danger" onClick={() => update()} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
});
