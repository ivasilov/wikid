import { PropsWithChildren } from 'react';

interface FormGroupProps
  extends PropsWithChildren<{
    label: string;
    htmlFor: string;
    errorText?: string;
    helperText?: string;
  }> {}

export const FormGroup = ({ label, children, htmlFor, errorText, helperText }: FormGroupProps) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">{children}</div>

      {errorText ? (
        <p className="mt-2 text-sm text-red-600" id="email-error"></p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
