import { upperFirst } from 'lodash';
import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, FileInput, FormGroup } from '../../components';
import { EditPagesForBookmark, IdName } from '../../components/edit-pages-for-bооkmark';
import { useImportFileMutation } from '../../models';

export const Imports = () => {
  const [state, setState] = useState<{ dialogShown: boolean; type: string | undefined }>({
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
  const [state, setState] = useState<{ file: { name: string } | undefined; pages: IdName[] }>({
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
      <DialogBody>
        <FormGroup htmlFor="file-upload" label="File to be imported">
          {/* <FileInput text={inputText} hasSelection={!!state.file} large fill onInputChange={handleChange} /> */}
          <FileInput id="file-upload" subText="PNG, JPG, GIF up to 10MB" onChange={handleChange} />
        </FormGroup>
        <FormGroup htmlFor="pages-select" label="Link the imported bookmarks with these pages">
          <EditPagesForBookmark pages={state.pages} onChange={pages => setState({ ...state, pages })} />
        </FormGroup>
      </DialogBody>
      <DialogFooter>
        <Button onClick={props.onClose} text="Cancel" />
        <Button onClick={onSubmit} text="Save" />
      </DialogFooter>
    </Dialog>
  );
};
