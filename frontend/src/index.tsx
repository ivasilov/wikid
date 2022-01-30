import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import Container from 'typedi';
import { configure } from 'mobx';
import { FocusStyleManager } from '@blueprintjs/core';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from '@apollo/client';
import { GraphQLClient } from './apolloClient';
import { SignIn } from './signIn';
import { AuthenticatedRoute, UnauthenticatedRoute } from './components';
import { Home } from './home';
import reportWebVitals from './utils/reportWebVitals';

configure({ enforceActions: 'observed' });
const history = createBrowserHistory();
const client = Container.get(GraphQLClient);

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
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
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
