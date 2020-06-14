import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { Navbar, Alignment } from '@blueprintjs/core';

import './index.scss';

// import { Bookmarks } from './components/bookmarks';
// import { SinglePage } from './components/singlePage';
// import { Profile } from './profile';

export const App = observer(() => {
  return (
    <div className="app">
      <Navbar fixedToTop>
        <div className="container">
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <Link className="bp3-button bp3-minimal" type="button" to="/">
                Wikid
              </Link>
            </Navbar.Heading>
          </Navbar.Group>
          {/* <Navbar.Group align={Alignment.RIGHT}>
            <Button minimal icon="edit" text="Edit" />
            <Button minimal icon="insert" text="New page" />
            <Link className="bp3-button bp3-minimal" type="button" to="/profile">
              <Icon icon="cog" />
              <span className="bp3-button-text">Profile</span>
            </Link>
          </Navbar.Group> */}
        </div>
      </Navbar>
      <div className="navbar-empty-height container"></div>
    </div>
  );
});
