import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';
import { useStateTransient } from './utils';

import { observable, action } from 'mobx';

export class ProfileState {
  @observable importOnetabDialogShown = false;
  @observable importPinboardDialogShown = false;

  @action
  toggleImportOnetabDialog = () => {
    this.importOnetabDialogShown = !this.importOnetabDialogShown;
  };

  @action
  toggleImportPinboardDialog = () => {
    this.importPinboardDialogShown = !this.importPinboardDialogShown;
  };
}

export const Profile = observer(() => {
  // const state = useStateTransient(() => new ProfileState());

  return (
    <div>
      <h1>Profile</h1>
      <div>
        {/* <Button onClick={state.toggleImportOnetabDialog}>Import from OneTab...</Button> */}
        {/* <Button onClick={state.toggleImportPinboardDialog}>Import from Pinboard...</Button> */}
      </div>
    </div>
  );
});
