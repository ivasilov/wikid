import * as React from 'react';
import { Icon, H1 } from '@blueprintjs/core';

interface HeadingProps {
  page: { name: string };
  children: React.ReactNode;
}

export const Heading = ({ page, children }: HeadingProps) => {
  return (
    <div className="flex items-center">
      <Icon icon="tag" iconSize={22} className="w-icon pr-2" />
      <div className="flex-grow">
        <H1>{page.name}</H1>
      </div>
      <div>{children}</div>
    </div>
  );
};
