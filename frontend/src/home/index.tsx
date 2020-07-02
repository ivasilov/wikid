import './index.scss';
import * as React from 'react';
import { Page } from './page';
import { RouteComponentProps, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { NewBookmark } from './new-bookmark';
import { AllBookmarks } from './bookmarks';

export const Home = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="w-main col-span-10">
        <div className="pt-2 pb-2 pr-6 flex justify-end">search, options, profile</div>
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

          <Route path="/bookmarks" component={AllBookmarks} />
          <Redirect from="/" to="bookmarks" />
          {/* <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </div>
  );
};
