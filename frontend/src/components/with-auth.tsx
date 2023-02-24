import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { useCurrentUserQuery } from '../models';
import { Loading } from './loading';

export function withAuth<T>(
  WrappedComponent: ComponentType<T>,
  options?: {
    redirectTo: string;
    redirectIfFound?: boolean;
  },
) {
  const Wrapper = (props: any) => {
    const router = useRouter();

    const { data, loading } = useCurrentUserQuery();
    if (loading) {
      return <Loading />;
    }
    if (!data || !data.currentUser) {
      router.push('/sign-in', '/sign-in');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = 'AuthWrapper';
  return Wrapper;
}
