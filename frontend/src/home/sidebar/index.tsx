import './index.scss';
import * as React from 'react';
import { Icon } from '@blueprintjs/core';
import { PageCategories } from './pageCategories';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="w-sidebar col-span-2 overflow-y-auto">
      <div className="flex">
        <div className="w-logo">W</div>
        <div className="w-plus flex-grow flex justify-end">
          <Link to="/new-bookmark">
            <Icon icon="plus" iconSize={20} />
          </Link>
        </div>
      </div>

      <div className="w-categories pt-8 pl-5">
        <div className="pb-4">
          <Icon icon="home" className="w-icon pr-2" />
          <Link to="/bookmarks">All bookmarks</Link>
        </div>
        <div className="pb-4">
          <Icon icon="annotation" className="w-icon pr-2" />
          Untagged bookmarks
        </div>
        <div className="pb-4">
          <Icon icon="manual" className="w-icon pr-2" />
          <Link to="/bookmarks/unread">Reading list</Link>
        </div>
        <PageCategories />
      </div>
    </div>
  );
};
