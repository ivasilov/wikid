import { Tab as HeadlessTab } from '@headlessui/react';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export const TabGroup = ({ children, ...rest }: PropsWithChildren<{ defaultIndex?: number }>) => {
  return <HeadlessTab.Group {...rest}>{children}</HeadlessTab.Group>;
};
export const TabList = ({ children }: PropsWithChildren<{}>) => {
  return (
    <HeadlessTab.List as="div" className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {children}
      </nav>
    </HeadlessTab.List>
  );
};
export const Tab = ({ children }: PropsWithChildren<{}>) => {
  console.log(children);
  return (
    <HeadlessTab
      className={({ selected }) =>
        classNames(
          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm outline-none',
          selected
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        )
      }
    >
      {children}
    </HeadlessTab>
  );
};
export const TabPanels = ({ children }: PropsWithChildren<{}>) => {
  return <HeadlessTab.Panels className="mt-2">{children}</HeadlessTab.Panels>;
};
export const TabPanel = ({ children }: PropsWithChildren<{}>) => {
  return <HeadlessTab.Panel>{children}</HeadlessTab.Panel>;
};
