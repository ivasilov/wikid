import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '../../../../../components';
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
      <TabGroup defaultIndex={0}>
        <TabList>
          <Tab>Notes</Tab>
          <Tab>Bookmarks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Notes content={page.content} />
          </TabPanel>
          <TabPanel>
            <Bookmarks bookmarks={page.bookmarks} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};
