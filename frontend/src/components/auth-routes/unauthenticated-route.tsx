import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useCurrentUserQuery } from '../../models';
import { Loading } from '../loading';
import { isFunction } from 'lodash';

const CallbackComponent = (props: any) => {
  const { data, loading } = useCurrentUserQuery();
  if (loading) {
    return <Loading />;
  }
  if (data && data.currentUser) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    );
  } else {
    if (isFunction(props.children)) {
      return props.children(props);
    } else {
      return props.children;
    }
  }
};

// A wrapper for <Route> that redirects to the root route if you're authenticated.
export const UnauthenticatedRoute = ({ children, ...rest }: Omit<RouteProps, 'component' | 'render'>) => {
  return <Route {...rest} render={props => <CallbackComponent {...props}>{children}</CallbackComponent>} />;
};
