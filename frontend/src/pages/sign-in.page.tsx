import { useRouter } from 'next/router';
import { ReactElement, useEffect, useRef } from 'react';
import useFetch from 'use-http';
import { Button, FormGroup, Input } from '../components';
import { useCurrentUserQuery } from '../models';

export default function SignInPage() {
  const router = useRouter();
  let emailInput = useRef<HTMLInputElement>(null);
  let passwordInput = useRef<HTMLInputElement>(null);
  const { loading, error, post, response } = useFetch('/login', {
    cachePolicy: 'no-cache',
  } as any);

  const { data } = useCurrentUserQuery();

  useEffect(() => {
    if (data && data.currentUser) {
      router.push('/bookmarks', '/bookmarks');
    }
  }, [router, data]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput.current && passwordInput.current) {
      post({ email: emailInput.current.value, password: passwordInput.current.value });
    }
    return false;
  };

  if (response.ok) {
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      window.location.reload();
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={e => submit(e)}>
            <FormGroup htmlFor="email" label="Email address">
              <Input id="email" name="email" type="email" autoComplete="email" required ref={emailInput} />
            </FormGroup>
            <FormGroup htmlFor="password" label="Password">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                ref={passwordInput}
              />
            </FormGroup>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <Button intent="primary" type="submit" text="Sign in" size="medium" className="w-full" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// This is used to override the default layout.
SignInPage.getLayout = (page: ReactElement) => {
  return page;
};
