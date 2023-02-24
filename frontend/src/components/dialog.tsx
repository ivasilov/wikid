import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

interface DialogProps
  extends PropsWithChildren<{
    title: string;
    icon?: string; //TODO
    isOpen: boolean;
    onClose: () => void;
  }> {}

export const Dialog = ({ children, isOpen, onClose }: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        {/* backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* <HeadlessDialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"></HeadlessDialog.Panel> */}
              <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export const DialogTitle = ({ children }: PropsWithChildren<{}>) => {
  return (
    <HeadlessDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 p-6">
      {children}
    </HeadlessDialog.Title>
  );
};

export const DialogBody = ({ children }: PropsWithChildren<{}>) => {
  return <HeadlessDialog.Description className="px-6 pb-6">{children}</HeadlessDialog.Description>;
};
export const DialogFooter = ({ children }: PropsWithChildren<{}>) => {
  return <div className="bg-gray-50 px-4 py-3 flex sm:px-6 space-x-4 justify-end">{children}</div>;
};
