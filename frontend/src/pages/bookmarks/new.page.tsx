import { uniqBy } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input } from '../../components';
import { EditPagesForBookmark, IdName } from '../../components/edit-pages-for-bооkmark';
import { withAuth } from '../../components/with-auth';
import { useCreateBookmarkMutation, useGetAllPagesForDropdownLazyQuery } from '../../models';

const NewBookmarkPage = () => {
  const router = useRouter();
  const [name, setName] = useState(router.query['title'] as string);
  const [url, setUrl] = useState(router.query['url'] as string);
  const [pages, setPages] = useState<IdName[]>([]);

  const [getAllPages] = useGetAllPagesForDropdownLazyQuery();
  const [save] = useCreateBookmarkMutation({
    variables: {
      params: {
        name: name,
        url: url,
        pageIds: pages,
      },
    },
    onCompleted: () => router.push('/'),
  });

  const changeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const changePages = (p: IdName[]) => {
    let pages = p.map(p => ({ id: p.id, name: p.name }));
    setPages(uniqBy(pages, p => p.name));
  };

  const selectPage = (p: IdName) => {
    changePages(pages.concat([p]));
  };

  const addPage = (name: string) => {
    return { name: name };
  };

  const removePage = (page: any) => {
    setPages(pages.filter(p => p.name !== page));
  };

  const [availablePages, setAvailablePages] = useState<IdName[]>([]);
  useEffect(() => {
    getAllPages()
      .then(v => v.data?.currentUserPages)
      .then(ps => {
        return (ps || []).filter(bp => !pages.find(p => p.id === bp.id));
      })
      .then(ps => setAvailablePages(ps));
  }, [getAllPages, pages]);

  return (
    <div className="w-5/6 mx-auto mt-8">
      <FormGroup htmlFor="name" label="Name of the bookmark">
        <Input onChange={changeName} value={name} />
      </FormGroup>
      <FormGroup htmlFor="url" label="Url of the bookmark">
        <Input onChange={changeUrl} value={url} />
      </FormGroup>
      <FormGroup htmlFor="pages-select" label="Pages which have this bookmark">
        <EditPagesForBookmark pages={pages} onChange={changePages} />
      </FormGroup>
      <div>
        <Button onClick={() => router.push('/')} text="Cancel" />
        <Button onClick={() => save()} text="Save" />
      </div>
    </div>
  );
};

export default withAuth(NewBookmarkPage);
