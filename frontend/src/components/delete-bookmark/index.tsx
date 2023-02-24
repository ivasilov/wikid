import { Button, Dialog, DialogBody, DialogFooter, DialogTitle } from '..';
import { useDeleteBookmarkMutation } from '../../models';

interface Props {
  isOpen: boolean;
  bookmark: { id: string; name: string };
  onClose: () => void;
}

export const DeleteBookmarkDialog = (props: Props) => {
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
    <Dialog isOpen={props.isOpen} icon="info-sign" title="Delete bookmark" onClose={props.onClose}>
      <DialogTitle>Delete a bookmark?</DialogTitle>
      <DialogBody>
        Are you sure you want to delete <span style={{ color: 'orange' }}>{props.bookmark.name}</span>?
      </DialogBody>
      <DialogFooter>
        <Button intent="secondary" onClick={props.onClose} loading={loading} text="Cancel" />
        <Button intent="danger" onClick={() => update()} loading={loading} text="Delete" />
      </DialogFooter>
    </Dialog>
  );
};
