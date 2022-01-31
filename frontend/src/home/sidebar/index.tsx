import './index.scss';
import * as React from 'react';
import { Icon } from '@blueprintjs/core';
import { PageCategories } from './page-categories';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="col-span-2 overflow-y-auto w-sidebar">
      <div className="flex">
        <div className="w-logo">W</div>
        <div className="flex justify-end flex-grow w-plus">
          <Link to="/new-bookmark">
            <Icon icon="plus" iconSize={20} />
          </Link>
        </div>
      </div>

      <div className="pt-8 pl-5 w-categories">
        <div className="pb-4">
          <Icon icon="home" className="pr-2 w-icon" />
          <Link to="/bookmarks">All bookmarks</Link>
        </div>
        <div className="pb-4">
          <Icon icon="annotation" className="pr-2 w-icon" />
          Untagged bookmarks
        </div>
        <div className="pb-4">
          <Icon icon="manual" className="pr-2 w-icon" />
          <Link to="/bookmarks/unread">Reading list</Link>
        </div>
        <PageCategories />
      </div>
    </div>
  );
};
