import { Button } from '@blueprintjs/core';
import { useState } from 'react';
import { gqlBookmarkFragmentFragment } from '../../models';
import { DeleteBookmarkDialog } from '../delete-bookmark';
import { EditBookmarkDialog } from '../edit-bookmark';

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
            small
            className="ml-2"
            minimal
            icon="floppy-disk"
            onClick={() =>
              setState({
                editBookmarkDialogShown: true,
                deleteBookmarkDialogShown,
              })
            }
          />
          <Button
            small
            className="ml-2"
            intent="danger"
            minimal
            icon="trash"
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
