import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from '..';
import { gqlBookmarkFragmentFragment } from '../../models';
import { DeleteBookmarkDialog } from '../delete-bookmark';
import { EditBookmarkDialog } from '../edit-bookmark';
import { Icon } from '../icon';

export const Bookmark = (props: { bookmark: gqlBookmarkFragmentFragment }) => {
  const [{ editBookmarkDialogShown, deleteBookmarkDialogShown }, setState] = useState({
    editBookmarkDialogShown: false,
    deleteBookmarkDialogShown: false,
  });

  const bookmark = props.bookmark;
  let hostname = '';
  // new URL can throw and make the whole page unresponsive
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {}

  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow flex">
      <img
        className="mr-5 w-5 object-contain"
        alt="bookmark favicon"
        src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}&sz=16`}
      />
      <div>
        <div className="font-bold text-black">
          <a href={bookmark.url}>{bookmark.name}</a>
          <Button
            size="small"
            className="ml-2"
            minimal
            leftIcon={<Icon name={faFloppyDisk} size="xl" />}
            onClick={() =>
              setState({
                editBookmarkDialogShown: true,
                deleteBookmarkDialogShown,
              })
            }
          />
          <Button
            size="small"
            className="ml-2"
            intent="danger"
            minimal
            leftIcon={<Icon name={faTrash} size="xl" />}
            onClick={() =>
              setState({
                editBookmarkDialogShown,
                deleteBookmarkDialogShown: true,
              })
            }
          />
        </div>
        <span className="font-normal">{hostname}</span>
      </div>
      <DeleteBookmarkDialog
        isOpen={deleteBookmarkDialogShown}
        bookmark={bookmark}
        onClose={() =>
          setState({
            editBookmarkDialogShown,
            deleteBookmarkDialogShown: false,
          })
        }
      />
      <EditBookmarkDialog
        isOpen={editBookmarkDialogShown}
        bookmark={bookmark}
        onClose={() =>
          setState({
            deleteBookmarkDialogShown,
            editBookmarkDialogShown: false,
          })
        }
      />
    </div>
  );
};
