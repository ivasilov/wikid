import { Tab, Tabs } from '../../components';
import { withAuth } from '../../components/with-auth';
import { Imports } from './imports';
import { Settings } from './settings';

const AccountPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <Tabs defaultSelectedTabId="settings" animate className="pl-8">
        <Tab id="settings" title="Settings" panel={<Settings />} />
        <Tab id="imports" title="Imports" panel={<Imports />} />
      </Tabs>
    </div>
  );
};

export default withAuth(AccountPage);
