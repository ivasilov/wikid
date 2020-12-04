import { Button, Classes, Dialog, FileInput, FormGroup } from '@blueprintjs/core';
import * as React from 'react';
import { upperFirst } from 'lodash';
import { useImportFileMutation } from '../../models';
import { EditPagesForBookmark, IdName } from '../components/edit-pages-for-bооkmark';

export const Imports = () => {
  const [state, setState] = React.useState<{ dialogShown: boolean; type: string | undefined }>({
    dialogShown: false,
    type: undefined,
  });

  return (
    <>
      <Button text="Import from Pinboard" onClick={() => setState({ dialogShown: true, type: 'pinboard' })} />
      <Button text="Import from Onetab" onClick={() => setState({ dialogShown: true, type: 'onetab' })} />
      {state.dialogShown && (state.type === 'pinboard' || state.type === 'onetab') ? (
        <UploadDialog type={state.type} onClose={() => setState({ dialogShown: false, type: undefined })} />
      ) : null}
    </>
  );
};

const UploadDialog = (props: { type: 'pinboard' | 'onetab'; onClose: () => void }) => {
  const [state, setState] = React.useState<{ file: { name: string } | undefined; pages: IdName[] }>({
    file: undefined,
    pages: [],
  });

  const [mutate] = useImportFileMutation();

  const handleChange = (e: any) => {
    if (e && e.target && e.target.validity.valid && e.target.files && e.target.files[0]) {
      setState({ ...state, file: e.target.files[0] });
    }
  };

  const onSubmit = () => {
    mutate({ variables: { params: { upload: state.file, type: props.type } } }).then(() => {
      props.onClose();
    });
  };

  const inputText = state.file && state.file.name ? state.file.name : 'Choose file...';

  return (
    <Dialog isOpen icon="info-sign" title={`Import ${upperFirst(props.type)} data`} onClose={props.onClose}>
      <div className={Classes.DIALOG_BODY}>
        <FormGroup label="File to be imported">
          <FileInput text={inputText} hasSelection={!!state.file} large fill onInputChange={handleChange} />
        </FormGroup>
        <FormGroup label="Link the imported bookmarks with these pages">
          <EditPagesForBookmark pages={state.pages} onChange={pages => setState({ ...state, pages })} />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </div>
      </div>
    </Dialog>
  );
};
