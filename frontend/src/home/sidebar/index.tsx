import './index.scss';
import * as React from 'react';
import { Icon } from '@blueprintjs/core';
import { PageCategories } from './pageCategories';

export const Sidebar = () => {
  return (
    <div className="w-sidebar col-span-2 overflow-auto">
      <div className="w-logo">W</div>
      <div className="w-categories pt-8 pl-5">
        <div className="pb-4">
          <Icon icon="home" className="w-icon pr-2" />
          All bookmarks
        </div>
        <div className="pb-4">
          <Icon icon="annotation" className="w-icon pr-2" />
          Untagged bookmarks
        </div>
        <div className="pb-4">
          <Icon icon="manual" className="w-icon pr-2" />
          Reading list
        </div>
        <PageCategories />
      </div>
    </div>
  );
};
