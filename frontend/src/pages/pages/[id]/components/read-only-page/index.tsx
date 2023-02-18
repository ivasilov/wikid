import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Button, Tab, Tabs } from '../../../../../components';
import { Bookmarks } from '../../../../../components/bookmarks';
import { gqlReadOnlyPageFragmentFragment } from '../../../../../models';
import { Heading } from '../heading';

const Notes = (props: { content: string }) => {
  return <ReactMarkdown className="singlepage-content-text">{props.content}</ReactMarkdown>;
};

export const ReadOnlyPage = (props: { page: gqlReadOnlyPageFragmentFragment }) => {
  const page = props.page;

  return (
    <>
      <Heading page={page}>
        <Link href={`/pages/${page.id}/edit`}>
          <Button intent="primary" text="Edit" />
        </Link>
      </Heading>
      <Tabs id="mainPageSelector" defaultSelectedTabId="notes" animate className="pl-8">
        <Tab id="notes" title="Notes" panel={<Notes content={page.content} />} />
        <Tab id="bookmarks" title="Bookmarks" panel={<Bookmarks bookmarks={page.bookmarks} />} />
      </Tabs>
    </>
  );
};
