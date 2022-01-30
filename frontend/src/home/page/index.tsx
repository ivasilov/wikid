import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { SinglePageError } from './error';
import { usePageQuery } from '../../models';
import { EditingPage } from './editing-page';
import { ReadOnlyPage } from './read-only-page';
import { Loading } from '../../components';

interface Props extends RouteComponentProps<{ id: string }> {
  isEditing: boolean;
}

export const Page = observer((props: Props) => {
  return (
    <div className="w-5/6 mx-auto mt-8">
      <InnerPage {...props} />
    </div>
  );
});

const InnerPage = observer((props: Props) => {
  let id = props.match && props.match.params.id;

  if (!id) {
    return <SinglePageError />;
  }

  const { data, loading, error } = usePageQuery({ variables: { id } });
  if (error) {
    return <SinglePageError />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data && data.page) {
    const page = data.page;
    if (props.isEditing) {
      return <EditingPage page={page} />;
    } else {
      return <ReadOnlyPage page={page} />;
    }
  }

  return <SinglePageError />;
});
