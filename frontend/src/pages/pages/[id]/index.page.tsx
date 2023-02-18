import { useRouter } from 'next/router';
import { Loading } from '../../../components/loading';
import { withAuth } from '../../../components/with-auth';
import { usePageQuery } from '../../../models';
import { SinglePageError } from './components/error';
import { ReadOnlyPage } from './components/read-only-page';

const PagePage = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, loading, error } = usePageQuery({ variables: { id } });

  if (error) {
    return <SinglePageError />;
  }

  if (loading) {
    return <Loading />;
  }

  if (data && data.page) {
    const page = data.page;
    return <ReadOnlyPage page={page} />;
  }

  return <SinglePageError />;
};

export default withAuth(PagePage);
