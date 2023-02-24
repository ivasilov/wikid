import { IconLookup } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { Icon } from './icon';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  leftIcon?: IconLookup;
  rightIcon?: IconLookup;
}

export const Input = forwardRef(
  ({ className, type, leftIcon, rightIcon, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const classes = classNames(
      'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
      {
        'pl-10': leftIcon,
        'pr-10': rightIcon,
      },
      className,
    );

    return (
      <div className="relative mt-1 rounded-md shadow-sm">
        {leftIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Icon name={leftIcon} size="lg" aria-hidden="true" />
          </div>
        ) : null}

        <input className={classes} {...rest} type={type || 'text'} ref={ref} />

        {rightIcon ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            <Icon name={rightIcon} size="lg" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
