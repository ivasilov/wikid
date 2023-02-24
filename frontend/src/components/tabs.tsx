import { Tab as HeadlessTab } from '@headlessui/react';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export const TabGroup = ({ children, ...rest }: PropsWithChildren<{ defaultIndex?: number }>) => {
  return <HeadlessTab.Group {...rest}>{children}</HeadlessTab.Group>;
};
export const TabList = ({ children }: PropsWithChildren<{}>) => {
  return <HeadlessTab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">{children}</HeadlessTab.List>;
};
export const Tab = ({ children }: PropsWithChildren<{}>) => {
  console.log(children);
  return (
    <HeadlessTab
      className={({ selected }) =>
        classNames(
          'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700',
          'ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
          selected ? 'bg-white shadow' : 'text-primary-100 hover:bg-white/[0.12] hover:text-white',
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
