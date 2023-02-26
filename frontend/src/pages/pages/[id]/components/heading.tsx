import { Icon } from '@blueprintjs/core';
import { PropsWithChildren } from 'react';

export const Heading = ({ page, children }: PropsWithChildren<{ page: { name: string } }>) => {
  return (
    <div className="flex items-center">
      <Icon icon="tag" iconSize={22} className="pr-2" />
      <div className="flex-grow">
        <div className="text-lg">{page.name}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
