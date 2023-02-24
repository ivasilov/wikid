import { Switch as HeadlessSwitch } from '@headlessui/react';

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  value?: string;
};

export const Switch = (props: Props) => {
  return (
    <HeadlessSwitch
      className={`${props.checked ? 'bg-primary-900' : 'bg-primary-700'}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors 
          duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
           focus-visible:ring-white focus-visible:ring-opacity-75
      `}
      {...props}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${props.checked ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full
            bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HeadlessSwitch>
  );
};
