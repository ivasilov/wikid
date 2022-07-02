import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Button } from '../../../../components/button';
import { Spinner } from '../../../../components/spinner';
import { useUpdatePageMutation } from '../../../../models';
import { Heading } from './heading';
import { MarkdownEditor } from './markdown-editor';

export const EditingPage = observer(
  (props: { page: { id: string; name: string; description: string; content: string } }) => {
    const router = useRouter();
    const page = props.page;

    const editor = useRef<MarkdownEditor>(null);

    const [update, { loading }] = useUpdatePageMutation({ onCompleted: () => router.replace(`/page/${page.id}`) });

    if (loading) {
      return <Spinner />;
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
  },
);
