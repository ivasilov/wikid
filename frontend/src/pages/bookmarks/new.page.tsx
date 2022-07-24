import { ApolloClient, useApolloClient } from '@apollo/client';
import { Button, FormGroup, InputGroup, MenuItem } from '@blueprintjs/core';
import { IItemRendererProps, ItemPredicate, MultiSelect } from '@blueprintjs/select';
import { uniqBy } from 'lodash';
import { action, computed, observable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { withAuth } from '../../components/with-auth';
import {
  GetAllPagesForDropdownDocument,
  gqlGetAllPagesForDropdownQuery,
  gqlGetAllPagesForDropdownQueryVariables,
  useCreateBookmarkMutation,
} from '../../models';

type IdName = { id?: string; name: string };

const PageMultiSelect = MultiSelect.ofType<IdName>();

class NewBookmarkState {
  @observable name: string = '';
  @observable url: string = '';

  @observable pages: IdName[] = [];

  constructor(p: { url: string; title: string }, private client: ApolloClient<object>) {
    this.url = p.url;
    this.name = p.title;
    // this.changePages(this.props.bookmark.pages);
  }

  @action
  changeName = (e: React.FormEvent<HTMLInputElement>) => {
    this.name = e.currentTarget.value;
  };

  @action
  changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.url = e.currentTarget.value;
  };

  @action
  changePages = (p: IdName[]) => {
    let pages = p.map(p => ({ id: p.id, name: p.name }));
    this.pages = uniqBy(pages, p => p.name);
  };

  selectPage = (p: IdName) => {
    this.changePages(this.pages.concat([p]));
  };

  @action
  addPage = (name: string) => {
    return { name: name };
  };

  @action removePage = (page: any) => {
    this.pages = this.pages.filter(p => p.name !== page);
  };

  @computed get availablePages() {
    const pages = this.client
      .query<gqlGetAllPagesForDropdownQuery, gqlGetAllPagesForDropdownQueryVariables>({
        query: GetAllPagesForDropdownDocument,
      })
      .then(v => v.data.currentUserPages)
      .then(pages => {
        return pages.filter(bp => !this.pages.find(p => p.id === bp.id));
      });

    return fromPromise(pages);
  }

  isPageSelected = (page: IdName) => {
    return this.pages.find(p => p.id === page.id && p.name === page.name);
  };
}

export const filterPage: ItemPredicate<IdName> = (query, page, _index, exactMatch) => {
  const normalizedName = page.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedName === normalizedQuery;
  } else {
    return normalizedName.indexOf(normalizedQuery) >= 0;
  }
};

const renderPage = (page: IdName, { modifiers, handleClick }: IItemRendererProps, state: NewBookmarkState) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  if (state.isPageSelected(page)) {
    return null;
  }

  return (
    <MenuItem
      key={page.name}
      active={modifiers.active}
      onClick={handleClick}
      shouldDismissPopover={false}
      text={page.name}
    />
  );
};

const renderNewTag = (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => {
  return (
    <MenuItem
      icon="add"
      text={`Create "${query}"`}
      active={active}
      onClick={handleClick}
      shouldDismissPopover={false}
    />
  );
};

const NewBookmarkPage = () => {
  const router = useRouter();
  const title = router.query['title'] as string;
  const url = router.query['url'] as string;
  router.query;
  const apollo = useApolloClient();
  const [state] = useState(() => new NewBookmarkState({ title, url }, apollo));
  const [save] = useCreateBookmarkMutation({
    variables: {
      params: {
        name: state.name,
        url: state.url,
        pageIds: state.pages,
      },
    },
    onCompleted: () => router.push('/'),
  });

  return (
    <div className="w-5/6 mx-auto mt-8">
      <FormGroup label="Name of the bookmark">
        <InputGroup leftIcon="filter" onChange={state.changeName} value={state.name} />
      </FormGroup>
      <FormGroup label="Url of the bookmark">
        <InputGroup leftIcon="filter" onChange={state.changeUrl} value={state.url} />
      </FormGroup>
      <FormGroup label="Pages which have this bookmark">
        {state.availablePages.case({
          pending: () => <div>Loading</div>,
          fulfilled: availablePages => (
            <PageMultiSelect
              fill
              tagRenderer={p => p.name}
              itemRenderer={(item, itemProps) => renderPage(item, itemProps, state)}
              itemPredicate={filterPage}
              onItemSelect={state.selectPage}
              createNewItemFromQuery={state.addPage}
              createNewItemRenderer={renderNewTag}
              items={availablePages}
              selectedItems={state.pages}
              noResults={<MenuItem disabled={true} text="No results." />}
              popoverProps={{ minimal: true }}
              tagInputProps={{
                tagProps: { minimal: true },
                onRemove: state.removePage,
              }}
            />
          ),
        })}
      </FormGroup>
      <div>
        <Button onClick={() => router.push('/')}>Cancel</Button>
        <Button onClick={() => save()}>Save</Button>
      </div>
    </div>
  );
};

export default withAuth(NewBookmarkPage);
