import * as React from 'react';
import { Spinner } from '@blueprintjs/core';

export const Loading = () => {
  return (
    <div className="container">
      <div className="row justify-content-center h-100vh">
        <Spinner intent="primary" size={145} />
      </div>
    </div>
  );
};
