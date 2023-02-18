import { faTag } from '@fortawesome/free-solid-svg-icons';
import { PropsWithChildren } from 'react';
import { Icon } from '../../../../components';

export const Heading = ({ page, children }: PropsWithChildren<{ page: { name: string } }>) => {
  return (
    <div className="flex items-center">
      <Icon name={faTag} size="1x" className="pr-2" />
      <div className="flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900">{page.name}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
};
