import { Button, Callout, Card, FormGroup, InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import useFetch from 'use-http';
import { useCurrentUserQuery } from '../models';

export default function SignInPage() {
  const router = useRouter();
  let emailInput: any;
  let passwordInput: any;
  const { loading, error, post, response } = useFetch('http://127.0.0.1:4000/login', {
    cachePolicy: 'no-cache',
  } as any);

  const { data } = useCurrentUserQuery();

  useEffect(() => {
    if (!data || !data.currentUser) {
      router.push('/bookmarks', '/bookmarks');
    }
  }, [router, data]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput && passwordInput) {
      post({ email: emailInput.value, password: passwordInput.value });
    }
  };

  if (response.ok) {
    if (response.data.accessToken) {
      // localStorage.setItem('accessToken', response.data.accessToken);
    }
    window.location.reload();
  }

  return (
    <div className="container mx-auto h-screen flex font-sans">
      <div className="self-center mx-auto">
        <Card elevation={2}>
          <div>
            <form onSubmit={e => submit(e)}>
              <FormGroup label="Email" labelFor="email-input" intent={error ? 'danger' : undefined}>
                <InputGroup
                  id="email-input"
                  large
                  inputRef={node => (emailInput = node)}
                  intent={error ? 'danger' : undefined}
                />
              </FormGroup>
              <FormGroup label="Password" labelFor="password-input" intent={error ? 'danger' : undefined}>
                <InputGroup
                  id="password-input"
                  large
                  type="password"
                  inputRef={node => (passwordInput = node)}
                  intent={error ? 'danger' : undefined}
                />
              </FormGroup>
              {error ? <Callout intent="danger">{`${error}`}</Callout> : null}
              <Button type="submit" minimal icon="log-in" text="Log in" loading={loading} />
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

// This is used to override the default layout.
Page.getLayout = function getLayout(page: ReactElement) {
  return page;
};
