import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useCurrentUserQuery } from './models';
import { Loading } from './loading';

const CallbackComponent = (props: any) => {
  const { data, loading } = useCurrentUserQuery();
  if (loading) {
    return <Loading />;
  }
  if (data && data.currentUser) {
    return props.children;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: props.location },
        }}
      />
    );
  }
};

// A wrapper for <Route> that redirects to the sign-in screen if you're not yet authenticated.
export const AuthenticatedRoute = ({ children, ...rest }: Omit<RouteProps, 'component' | 'render'>) => {
  return <Route {...rest} render={props => <CallbackComponent {...props}>{children}</CallbackComponent>} />;
};
