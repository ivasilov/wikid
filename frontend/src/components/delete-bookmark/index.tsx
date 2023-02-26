import { Button, Classes, Dialog } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import { useDeleteBookmarkMutation } from '../../models';

interface Props {
  bookmark: { id: string; name: string };
  onClose: () => void;
}

export const DeleteBookmarkDialog = observer((props: Props) => {
  const [update, { loading }] = useDeleteBookmarkMutation({
    variables: { id: props.bookmark.id },
    update: (cache, { data }) => {
      const id = data?.deleteBookmark;
      if (id) {
        cache.modify({
          fields: {
            currentUserBookmarks: (cubRefs, { readField }) => {
              return { ...cubRefs, bookmarks: cubRefs.bookmarks.filter((bRef: any) => id !== readField('id', bRef)) };
            },
          },
        });
      }
    },
    // refetchQueries: [refetchAllBookmarksQuery(), refetchUnreadBookmarksQuery()],
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
