import './index.scss';
import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Loading } from '../components';
import { lazily } from 'react-lazily';

const { NewBookmark } = lazily(() => import('./new-bookmark'));
const { Page } = lazily(() => import('./page'));
const { UnreadBookmarks } = lazily(() => import('./unread-bookmarks'));
const { AllBookmarks } = lazily(() => import('./allBookmarks'));
const { Account } = lazily(() => import('./account'));

export const Home = () => {
  return (
    <div className="grid grid-cols-12 font-sans h-screen">
      <Sidebar />
      <div className="w-main col-span-10 overflow-y-auto">
        <div className="pt-2 pb-2 pr-6 flex justify-end">
          <Link to="/account">Account</Link>
        </div>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/new-bookmark/:url/:title"
              component={(props: RouteComponentProps<{ url: string; title: string }>) => <NewBookmark {...props} />}
            />
            <Route
              path="/page/:id/edit"
              component={(props: RouteComponentProps<{ id: string }>) => <Page {...props} isEditing={true} />}
            />
            <Route
              path="/page/:id"
              component={(props: RouteComponentProps<{ id: string }>) => <Page {...props} isEditing={false} />}
            />
            <Route path="/bookmarks/unread" component={UnreadBookmarks} />
            <Route path="/bookmarks" component={AllBookmarks} />
            <Route path="/account" component={Account} />
            <Redirect from="/" to="bookmarks" />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
};
