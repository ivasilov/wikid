import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { uniqBy } from 'lodash';
import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogTitle, FormGroup, Input, Spinner, Switch } from '..';
import { useGetBookmarkQuery, useUpdateBookmarkMutation } from '../../models';
import { EditPagesForBookmark, IdName } from '../edit-pages-for-bооkmark';

interface Props {
  isOpen: boolean;
  bookmark: { id: string };
  onClose: () => void;
}

export const EditBookmarkDialog = (props: Props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const [pages, setPages] = useState<IdName[]>([]);
  const [read, setRead] = useState(false);

  const { loading } = useGetBookmarkQuery({
    variables: { id: props.bookmark.id },
    onCompleted: data => {
      const bookmark = data.bookmark;

      setName(bookmark.name);
      setUrl(bookmark.url);
      setRead(bookmark.read);
      changePages(bookmark.pages);
    },
  });

  const [update, { loading: loadingUpdate }] = useUpdateBookmarkMutation({
    variables: {
      params: {
        id: props.bookmark.id,
        name: name,
        url: url,
        read: read,
        pageIds: pages,
      },
    },
    onCompleted: () => props.onClose(),
  });

  const changeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const changeReadFlag = (flag: boolean) => {
    setRead(flag);
  };

  const changePages = (p: IdName[]) => {
    let pages = p.map(p => ({ id: p.id, name: p.name }));
    setPages(uniqBy(pages, p => p.name));
  };

  return (
    <Dialog isOpen={props.isOpen} icon="info-sign" title="Edit bookmark" onClose={props.onClose}>
      {loading || loadingUpdate ? (
        <Spinner className="my-5" size="2x" />
      ) : (
        <>
          <DialogTitle>Editing bookmark</DialogTitle>
          <DialogBody>
            <FormGroup htmlFor="name" label="Name of the bookmark">
              <Input leftIcon={faFilter} id="name" onChange={changeName} value={name} />
            </FormGroup>
            <FormGroup htmlFor="url" label="Url of the bookmark">
              <Input leftIcon={faFilter} onChange={changeUrl} value={url} />
            </FormGroup>
            <FormGroup htmlFor="read" label="Read">
              <Switch checked={read} onChange={changeReadFlag} />
            </FormGroup>

            <FormGroup htmlFor="pages" label="Pages which have this bookmark">
              <EditPagesForBookmark pages={pages} onChange={changePages} />
            </FormGroup>
          </DialogBody>
          <DialogFooter>
            <Button intent="secondary" onClick={props.onClose} text="Cancel" />
            <Button intent="primary" onClick={() => update()} text="Save" />
          </DialogFooter>
        </>
      )}
    </Dialog>
  );
};
