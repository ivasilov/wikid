import * as React from 'react';
import { observer } from 'mobx-react';
import { MarkdownEditor } from './markdown-editor';
import { useUpdatePageMutation } from '../../models';
import { Button, Spinner } from '@blueprintjs/core';
import { Heading } from './heading';
import { useHistory } from 'react-router';

export const EditingPage = observer(
  (props: { page: { id: string; name: string; description: string; content: string } }) => {
    const page = props.page;

    const editor = React.useRef<MarkdownEditor>(null);
    const history = useHistory();

    const [update, { loading }] = useUpdatePageMutation({ onCompleted: () => history.push(`/page/${page.id}`) });

    if (loading) {
      return <Spinner intent="primary" size={145} />;
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
