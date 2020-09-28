import * as React from 'react';
import { observer } from 'mobx-react';
import { Dialog, Button, Classes, InputGroup, MenuItem, Spinner, FormGroup } from '@blueprintjs/core';
import { MultiSelect, ItemPredicate, IItemRendererProps } from '@blueprintjs/select';
import { action, observable, computed, runInAction } from 'mobx';
import { uniqBy } from 'lodash';
import Container from 'typedi';
import { fromPromise } from 'mobx-utils';
import {
  gqlGetAllPagesQuery,
  gqlGetAllPagesQueryVariables,
  GetAllPagesDocument,
  UpdateBookmarkDocument,
  gqlGetBookmarkQuery,
  gqlUpdateBookmarkMutation,
  gqlUpdateBookmarkMutationVariables,
  GetBookmarkDocument,
  gqlGetBookmarkQueryVariables,
} from '../../../models';
import { GraphQLClient } from '../../../apolloClient';

type IdName = { id?: string; name: string };

interface Props {
  bookmark: { id: string };
  onClose: () => void;
}

const PageMultiSelect = MultiSelect.ofType<IdName>();

class EditBookmarkDialogState {
  readonly props: Props;
  @observable name: string = '';
  @observable url: string = '';

  @observable pages: IdName[] = [];
  @observable loading: boolean = false;

  constructor(p: Props) {
    this.props = p;
    this.init();
  }

  cancel = () => {
    this.props.onClose();
  };

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

  @action removePage = (page: string) => {
    this.pages = this.pages.filter(p => p.name !== page);
  };

  @computed get availablePages() {
    const client = Container.get(GraphQLClient);
    const pages = client
      .query<gqlGetAllPagesQuery, gqlGetAllPagesQueryVariables>({ query: GetAllPagesDocument })
      .then(v => v.data.currentUserPages)
      .then(pages => {
        return pages.filter(bp => !this.pages.find(p => p.id === bp.id));
      });

    return fromPromise(pages);
  }

  isPageSelected = (page: IdName) => {
    return this.pages.find(p => p.id === page.id && p.name === page.name);
  };

  init = () => {
    this.loading = true;
    const client = Container.get(GraphQLClient);

    client
      .query<gqlGetBookmarkQuery, gqlGetBookmarkQueryVariables>({
        query: GetBookmarkDocument,
        variables: { id: this.props.bookmark.id },
      })
      .then(result =>
        runInAction(() => {
          this.loading = false;
          const bookmark = result.data.bookmark;

          this.name = bookmark.name;
          this.url = bookmark.url;
          this.changePages(bookmark.pages);
        }),
      )
      .catch(() =>
        runInAction(() => {
          this.loading = false;
        }),
      );
  };

  @action
  save = () => {
    this.loading = true;
    const client = Container.get(GraphQLClient);

    client
      .mutate<gqlUpdateBookmarkMutation, gqlUpdateBookmarkMutationVariables>({
        mutation: UpdateBookmarkDocument,
        variables: {
          params: {
            id: this.props.bookmark.id,
            name: this.name,
            url: this.url,
            pageIds: this.pages,
          },
        },
      })
      .then(() =>
        runInAction(() => {
          this.loading = false;
          this.props.onClose();
        }),
      )
      .catch(() =>
        runInAction(() => {
          this.loading = false;
        }),
      );
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

const renderPage = (page: IdName, { modifiers, handleClick }: IItemRendererProps, state: EditBookmarkDialogState) => {
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

export const EditBookmarkDialog = observer((props: Props) => {
  const [state] = React.useState(() => new EditBookmarkDialogState(props));

  return (
    <Dialog isOpen icon="info-sign" title="Edit bookmark" onClose={state.props.onClose}>
      {state.loading ? (
        <Spinner className="my-5" size={Spinner.SIZE_LARGE} />
      ) : (
        <>
          <div className={Classes.DIALOG_BODY}>
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
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={state.cancel}>Cancel</Button>
              <Button onClick={state.save}>Save</Button>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
});
