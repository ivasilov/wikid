import { useRouter } from 'next/router';
import { Loading } from '../../../components/loading';
import { usePageQuery } from '../../../models';
import { SinglePageError } from './components/error';
import { ReadOnlyPage } from './components/read-only-page';

export default function Page() {
  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, loading, error } = usePageQuery({ variables: { id } });

  if (error) {
    return (
      <div className="w-5/6 mx-auto mt-8">
        <SinglePageError />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-5/6 mx-auto mt-8">
        <Loading />
      </div>
    );
  }

  if (data && data.page) {
    const page = data.page;
    return (
      <div className="w-5/6 mx-auto mt-8">
        <ReadOnlyPage page={page} />
      </div>
    );
  }

  return (
    <div className="w-5/6 mx-auto mt-8">
      <SinglePageError />
    </div>
  );
}
