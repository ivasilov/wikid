import './bookmark.scss';
import * as React from 'react';
import { useBookmarkQuery } from '../../models';
import { Button } from '@blueprintjs/core';
import { DeleteBookmarkDialog } from '../components/deleteBookmark';
import { EditBookmarkDialog } from '../components/editBookmark';

type Props = {
  id: string;
};

export const Bookmark = (props: Props) => {
  const { data, loading, error } = useBookmarkQuery({ variables: { id: props.id } });
  const [{ editBookmarkDialogShown, deleteBookmarkDialogShown }, setState] = React.useState({
    editBookmarkDialogShown: false,
    deleteBookmarkDialogShown: false,
  });

  if (error) {
    return <div>Something bad happened.</div>;
  }

  if (loading) {
    return (
      <div className="w-bookmark-loading flex pb-6">
        <img className="w-favicon mr-5 bp3-skeleton" alt="bookmark favicon" />
        <div>
          <div className="w-bookmark-name font-bold bp3-skeleton">Skeleton text bookmark name</div>
          <span className="w-bookmark-url font-normal bp3-skeleton">Skeleton text url</span>
        </div>
      </div>
    );
  }

  if (data) {
    const bookmark = data.bookmark;

    return (
      <div className="flex pb-6">
        <img
          className="w-favicon mr-5"
          alt="bookmark favicon"
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`}
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
  }

  return <div>Something bad happened.</div>;
};
