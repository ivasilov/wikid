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
      <div className="flex bp3-skeleton">
        <img className="w-favicon pr-5" alt="bookmark favicon" />
        <div>
          <div className="font-bold">Skeleton text bookmark name</div>
          <div className="font-normal">Skeleton text url</div>
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
          <div className="font-normal">{new URL(bookmark.url).hostname}</div>
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
