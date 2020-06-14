import * as React from 'react';
import { Link } from 'react-router-dom';
import { Classes, H5, Card, Elevation, Popover, Button, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { useBookmarkQuery } from '../../models';

type Props = {
  id: string;
  onEditBookmark: (b: any) => void;
  onDeleteBookmark: (b: any) => void;
};

export const BookmarkItem = (props: Props) => {
  const { data, loading, error } = useBookmarkQuery({ variables: { id: props.id } });

  const bookmarkMenu = (
    <Menu>
      <MenuItem icon="graph" text="Edit" onClick={() => props.onEditBookmark(data?.bookmark)} />
      <MenuDivider />
      <MenuItem
        intent="danger"
        icon="zoom-to-fit"
        text="Delete"
        onClick={() => props.onDeleteBookmark(data?.bookmark)}
      />
    </Menu>
  );

  if (error) {
    return <div>Something bad happened.</div>;
  }

  if (loading) {
    return (
      <Card elevation={Elevation.TWO} key={props.id} className={`row`}>
        <div className="col-11">
          <p>
            <span style={{ fontSize: 16 }} className={Classes.SKELETON}>
              Bookmark name
            </span>
          </p>
          <div style={{ fontSize: 12 }}>
            {[1, 2, 3].map(p => (
              <>
                <span className={Classes.SKELETON}>Bookmark name</span>{' '}
              </>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (data) {
    const bookmark = data.bookmark;

    return (
      <Card elevation={Elevation.TWO} key={props.id} className="row">
        <div className="col-11">
          <H5>
            <a href={bookmark.url}>{bookmark.name}</a>
          </H5>

          <div style={{ fontSize: 12 }}>
            {bookmark.pages.map(p => (
              <>
                <Link key={p.id} style={{ color: 'orange' }} to={`/page/${p.id}`}>
                  {p.name}
                </Link>{' '}
              </>
            ))}
          </div>
        </div>
        <div className="col-1">
          <Popover content={bookmarkMenu}>
            <Button icon="more" />
          </Popover>
        </div>
      </Card>
    );
  }
  return null;
};
