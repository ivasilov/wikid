import { InputGroup } from '@blueprintjs/core';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="grid h-screen grid-cols-12 font-sans">
      <Sidebar />
      <div className="col-span-10 overflow-y-auto bg-white">
        <>
          <div className="flex justify-between pt-2 pb-2 px-6">
            <InputGroup type="search" large />
            <Link href="/account">Account</Link>
          </div>

          {children}
        </>
      </div>
    </div>
  );
};
