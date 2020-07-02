import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Bookmark } from './bookmark';
import { Tabs, Tab, Button } from '@blueprintjs/core';
import ReactMarkdown from 'react-markdown';
import { Heading } from './heading';
import { Bookmarks } from './bookmarks';

const Notes = observer((props: { content: string }) => {
  return <ReactMarkdown className="singlepage-content-text" source={props.content} />;
});

export const ReadOnlyPage = observer(
  (props: {
    page: { id: string; name: string; description: string; content: string; bookmarks: { id: string }[] };
  }) => {
    const page = props.page;

    return (
      <>
        <Heading page={page}>
          <Link to={`/page/${page.id}/edit`}>
            <Button intent="primary" text="Edit" />
          </Link>
        </Heading>
        <Tabs id="mainPageSelector" defaultSelectedTabId="notes" animate className="pl-8">
          <Tab id="notes" title="Notes" panel={<Notes content={page.content} />} />
          <Tab id="bookmarks" title="Bookmarks" panel={<Bookmarks bookmarks={page.bookmarks} />} />
        </Tabs>
      </>
    );
  },
);
