import './index.scss';
import * as React from 'react';
import { Page } from './page';
import { RouteComponentProps, Redirect } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { NewBookmark } from './new-bookmark';
import { AllBookmarks } from './allBookmarks';
import { UnreadBookmarks } from './unread-bookmarks';
import { Account } from './account';

export const Home = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="w-main col-span-10">
        <div className="pt-2 pb-2 pr-6 flex justify-end">
          <Link to="/account">Account</Link>
        </div>
        <Switch>
          <Route
            path="/new-bookmark/:url?"
            component={(props: RouteComponentProps<{ url: string }>) => <NewBookmark {...props} />}
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
      </div>
    </div>
  );
};
