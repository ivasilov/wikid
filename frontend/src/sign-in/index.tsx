import * as React from 'react';
import { Card, InputGroup, Button, FormGroup, Callout } from '@blueprintjs/core';
import useFetch from 'use-http';

export const SignIn = () => {
  let emailInput: any;
  let passwordInput: any;
  const { loading, error, post, response } = useFetch('/login', { cachePolicy: 'no-cache' } as any);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput && passwordInput) {
      post({ email: emailInput.value, password: passwordInput.value });
    }
  };

  if (response.ok) {
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
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
};
