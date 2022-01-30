import './bookmark.scss';
import * as React from 'react';
import { gqlBookmarkFragmentFragment } from '../../../models';
import { Button } from '@blueprintjs/core';
import { DeleteBookmarkDialog } from '../delete-bookmark';
import { EditBookmarkDialog } from '../editBookmark';

export const Bookmark = (props: { bookmark: gqlBookmarkFragmentFragment }) => {
  const [{ editBookmarkDialogShown, deleteBookmarkDialogShown }, setState] = React.useState({
    editBookmarkDialogShown: false,
    deleteBookmarkDialogShown: false,
  });

  const bookmark = props.bookmark;

  return (
    <div className="flex pb-6">
      <img
        className="w-favicon mr-5"
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
