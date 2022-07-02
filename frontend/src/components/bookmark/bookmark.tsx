import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { gqlBookmarkFragmentFragment } from '../../models';
import { Button } from '../button';
import { DeleteBookmarkDialog } from '../delete-bookmark';
import { EditBookmarkDialog } from '../edit-bookmark';
import { Icon } from '../icon';

export const Bookmark = (props: { bookmark: gqlBookmarkFragmentFragment }) => {
  const [{ editBookmarkDialogShown, deleteBookmarkDialogShown }, setState] = useState({
    editBookmarkDialogShown: false,
    deleteBookmarkDialogShown: false,
  });

  const bookmark = props.bookmark;

  return (
    <div className="flex pb-6">
      <img
        className="mr-5 w-5 object-contain"
        alt="bookmark favicon"
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}&sz=16`}
      />
      <div>
        <div className="font-bold">
          <a href={bookmark.url}>{bookmark.name}</a>
          <Button
            size="sm"
            className="ml-2"
            minimal
            leftIcon={<Icon name={faFloppyDisk} />}
            onClick={() =>
              setState({
                editBookmarkDialogShown: true,
                deleteBookmarkDialogShown,
              })
            }
          />
          <Button
            size="sm"
            className="ml-2"
            intent="danger"
            minimal
            leftIcon={<Icon name={faTrash} />}
            onClick={() =>
              setState({
                editBookmarkDialogShown,
                deleteBookmarkDialogShown: true,
              })
            }
          />
        </div>
        <span className="font-normal">{new URL(bookmark.url).hostname}</span>
      </div>
      {deleteBookmarkDialogShown && bookmark ? (
        <DeleteBookmarkDialog
          bookmark={bookmark}
          onClose={() =>
            setState({
              editBookmarkDialogShown,
              deleteBookmarkDialogShown: false,
            })
          }
        />
      ) : null}
      {editBookmarkDialogShown && bookmark ? (
        <EditBookmarkDialog
          bookmark={bookmark}
          onClose={() =>
            setState({
              editBookmarkDialogShown: false,
              deleteBookmarkDialogShown,
            })
          }
        />
      ) : null}
    </div>
  );
};
