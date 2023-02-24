import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Button, Spinner } from '../../../../components';
import { useUpdatePageMutation } from '../../../../models';
import { Heading } from './heading';
import { MarkdownEditor } from './markdown-editor';

export const EditingPage = (props: { page: { id: string; name: string; description: string; content: string } }) => {
  const router = useRouter();
  const page = props.page;

  const editor = useRef<MarkdownEditor>(null);

  const [update, { loading }] = useUpdatePageMutation({ onCompleted: () => router.replace(`/page/${page.id}`) });

  if (loading) {
    // intent="primary"
    return <Spinner size="1x" />;
  }

  return (
    <>
      <Heading page={page}>
        <Button
          text="Save"
          onClick={() =>
            update({
              variables: {
                params: {
                  id: props.page.id,
                  content: editor.current?.getContent(),
                },
              },
            })
          }
        />
      </Heading>
      <div className="pl-8">
        <MarkdownEditor ref={editor} content={page.content} />
      </div>
    </>
  );
};
