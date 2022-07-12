import { useRouter } from 'next/router';
import { Loading } from '../components/loading';
import { useCurrentUserQuery } from '../models';

export default function Page() {
  const router = useRouter();

  const { data, loading } = useCurrentUserQuery();
  if (loading) {
    return <Loading />;
  }
  if (!data || !data.currentUser) {
    router.push('/bookmarks', '/bookmarks');
  } else {
    router.push('/sign-in', '/sign-in');
  }
  return null;
}
