import { Tab, Tabs } from '@blueprintjs/core';
import { Imports } from './imports';
import { Settings } from './settings';

export default function Account() {
  return (
    <div className="container mx-auto mt-8">
      <Tabs defaultSelectedTabId="settings" animate className="pl-8">
        <Tab id="settings" title="Settings" panel={<Settings />} />
        <Tab id="imports" title="Imports" panel={<Imports />} />
      </Tabs>
    </div>
  );
}
