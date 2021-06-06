import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import Container from 'typedi';
import { configure } from 'mobx';
import { FocusStyleManager } from '@blueprintjs/core';
import * as serviceWorker from './utils/serviceWorker';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient } from './apolloClient';
import { SignIn } from './signIn';
import { AuthenticatedRoute } from './authenticatedRoute';
import { UnauthenticatedRoute } from './unauthenticatedRoute';
import { Home } from './home';

configure({ enforceActions: 'observed' });
const history = createBrowserHistory();
const client = Container.get(GraphQLClient);

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Switch>
        <UnauthenticatedRoute path="/sign-in">
          <SignIn />
        </UnauthenticatedRoute>
        <AuthenticatedRoute path="/*">
          <Home />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
