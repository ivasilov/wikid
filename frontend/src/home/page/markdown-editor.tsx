import './markdown-editor.scss';
import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { schema, defaultMarkdownParser } from 'prosemirror-markdown';
import { exampleSetup } from 'prosemirror-example-setup';

interface Props {
  content: string;
}

/**
 * This wraps ProseMirror's EditorView into React component.
 */
export class MarkdownEditor extends React.Component<Props, {}> {
  private refEditor = React.createRef<HTMLDivElement>();
  private refContent = React.createRef<HTMLDivElement>();

  private view: EditorView<any> | null = null;
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

  focus() {
    if (this.view) {
      this.view.focus();
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
        <div ref={this.refContent} />
      </div>
    );
  }
}
