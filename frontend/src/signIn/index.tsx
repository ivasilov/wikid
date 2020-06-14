import * as React from 'react';
import { Card, InputGroup, Button, FormGroup, Callout } from '@blueprintjs/core';
import useFetch from 'use-http';

import './index.scss';

export const SignIn = () => {
  let emailInput: any;
  let passwordInput: any;
  const { loading, error, post, response } = useFetch('http://localhost:4000/login');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailInput && passwordInput) {
      post({ username: emailInput.value, password: passwordInput.value });
    }
  };

  if (response.ok) {
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    window.location.reload(false);
  }

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center h-100vh">
        <Card className="col-4 m-200px" elevation={2}>
          <div className="my-2">
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
