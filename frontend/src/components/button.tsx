import classnames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Spinner } from './spinner';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  intent?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'inline' | 'small' | 'medium' | 'large';
  minimal?: boolean;
}

/**
 * Button with all bells and whistles. Forwardref is required so that it plays nicely with Nextjs Link.
 */
export const Button = forwardRef(
  (
    { className, text, leftIcon, rightIcon, minimal, loading, disabled, ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const intent = rest.intent ?? 'primary';
    minimal = minimal ?? false;
    const size = rest.size ?? 'medium';
    disabled = disabled ?? false;
    loading = loading ?? false;
    if (loading) {
      disabled = true;
    }

    // TODO: decide if we want a focus ring
    // focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    let classes = classnames(
      `font-display font-semibold inline-flex items-center border rounded-md hover:opacity-[85%] outline-none`,
      {
        '': size === 'inline', // dont add any classes for inline button
        // line heights are different from the design system
        'text-xs px-3 py-[6px] lg:py-2 lg:px-5': size === 'small',
        'text-base px-4 py-2': size === 'medium',
        'text-lg px-5 py-3': size === 'large',
        'text-muted bg-gray-300 border border-gray-300 cursor-not-allowed hover:opacity-100': disabled,
        'justify-center': !leftIcon && !rightIcon,
      },
      className,
    );

    if (!disabled) {
      if (minimal) {
        classes = classnames(classes, {
          'bg-white border': true,
          'text-primary-500 border-primary-500': intent === 'primary',
          'text-secondary-500 border-secondary-500': intent === 'secondary',
          'text-success border-success': intent === 'success',
          'text-danger border-danger': intent === 'danger',
          'text-warning border-warning': intent === 'warning',
        });
      } else {
        classes = classnames(classes, {
          'text-white': true,
          'bg-primary-500 border-primary-600 hover:bg-primary-700': intent === 'primary',
          'bg-secondary-500 border-secondary-500': intent === 'secondary',
          'bg-success border-success': intent === 'success',
          'bg-danger border-danger': intent === 'danger',
          'bg-warning border-warning': intent === 'warning',
        });
      }
    }

    return (
      <button {...rest} disabled={disabled} className={classes} ref={ref}>
        {loading ? (
          <span className={text ? 'mr-1' : ''}>
            <Spinner />
          </span>
        ) : null}
        {leftIcon ? <span className={text ? 'mr-1' : ''}>{leftIcon}</span> : null}
        {text}
        {rightIcon ? <span className={text ? 'ml-1 -mr-1 text-2xs lg:ml-2 lg:text-xs' : ''}>{rightIcon}</span> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
