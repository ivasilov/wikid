import { Icon } from '@blueprintjs/core';
import Link from 'next/link';
import { PageCategories } from './page-categories';

export const Sidebar = () => {
  return (
    <div className="col-span-2 overflow-y-auto bg-[#f2f4f7] min-h-screen">
      <div className="flex">
        <div className="h-10 w-10 bg-[#343b4b] text-base text-white px-3 py-2.5">W</div>
        <div className="flex justify-end flex-grow px-3 py-2.5">
          <Link href="/bookmarks/new">
            <Icon icon="plus" iconSize={20} />
          </Link>
        </div>
      </div>

      <div className="pt-8 pl-5 list-none text-sm font-normal">
        <div className="pb-4">
          <Icon icon="home" className="pr-2 w-icon" />
          <Link href="/bookmarks">
            <a>All bookmarks</a>
          </Link>
        </div>
        <div className="pb-4">
          <Icon icon="manual" className="pr-2 w-icon" />
          <Link href="/bookmarks/unread">
            <a>Reading list</a>
          </Link>
        </div>
        <PageCategories />
      </div>
    </div>
  );
};
