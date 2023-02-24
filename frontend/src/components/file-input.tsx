import { ForwardedRef, forwardRef } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  subText?: string;
}

export const FileInput = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className="mt-1 sm:col-span-2 sm:mt-0">
      <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            {/* TODO: decide if we want a focus for input focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 */}
            <label
              htmlFor={props.id}
              className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 hover:text-primary-500"
            >
              <span>Upload a file</span>
              <input name="file-upload" type="file" className="sr-only" ref={ref} {...props} />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          {props.subText ? <p className="text-xs text-gray-500">{props.subText}</p> : null}
        </div>
      </div>
    </div>
  );
});

FileInput.displayName = 'Input';
