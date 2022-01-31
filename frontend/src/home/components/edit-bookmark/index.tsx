import * as React from 'react';
import { observer } from 'mobx-react';
import { Dialog, Button, Classes, InputGroup, Spinner, FormGroup, Switch } from '@blueprintjs/core';
import { action, observable, runInAction } from 'mobx';
import { uniqBy } from 'lodash';
import Container from 'typedi';
import {
  UpdateBookmarkDocument,
  gqlGetBookmarkQuery,
  gqlUpdateBookmarkMutation,
  gqlUpdateBookmarkMutationVariables,
  GetBookmarkDocument,
  gqlGetBookmarkQueryVariables,
} from '../../../models';
import { GraphQLClient } from '../../../utils/apollo-client';
import { EditPagesForBookmark, IdName } from '../edit-pages-for-bооkmark';

interface Props {
  bookmark: { id: string };
  onClose: () => void;
}

class EditBookmarkDialogState {
  readonly props: Props;
  @observable name: string = '';
  @observable url: string = '';

  @observable pages: IdName[] = [];
  @observable loading: boolean = false;
  @observable read: boolean = false;

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
  changeReadFlag = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.read = !this.read;
  };

  @action
  changePages = (p: IdName[]) => {
    let pages = p.map(p => ({ id: p.id, name: p.name }));
    this.pages = uniqBy(pages, p => p.name);
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
          this.read = bookmark.read;
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
            read: this.read,
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
            <Switch checked={state.read} label="Read" onChange={state.changeReadFlag} />
            <FormGroup label="Pages which have this bookmark">
              <EditPagesForBookmark pages={state.pages} onChange={state.changePages} />
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
