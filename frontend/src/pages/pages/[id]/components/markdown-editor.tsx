import { exampleSetup } from 'prosemirror-example-setup';
import { defaultMarkdownParser, schema } from 'prosemirror-markdown';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';

interface Props {
  content: string;
}

/**
 * This wraps ProseMirror's EditorView into React component.
 */
export class MarkdownEditor extends React.Component<Props, {}> {
  private refEditor = React.createRef<HTMLDivElement>();

  private view: EditorView | null = null;
  private readonly editorState: EditorState;

  constructor(p: Props) {
    super(p);
    this.editorState = EditorState.create({
      doc: defaultMarkdownParser.parse(p.content),
      plugins: exampleSetup({ schema }),
    });
  }

  componentDidMount() {
    const element = this.refEditor.current;
    if (element) {
      this.view = new EditorView(element, { state: this.editorState });
    }
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.destroy();
    }
  }

  getContent = () => {
    return this.view?.state.doc.textContent;
  };

  render() {
    return (
      <div ref={this.refEditor}>
        <div />
      </div>
    );
  }
}
