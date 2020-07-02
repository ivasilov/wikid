import * as React from 'react';
import { Spinner } from '@blueprintjs/core';

export const Loading = () => {
  return (
    <div className="container mx-auto h-100vh flex">
      <div className="self-center mx-auto">
        <Spinner intent="primary" size={145} />
      </div>
    </div>
  );
};
