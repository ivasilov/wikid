import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '../../components';
import { withAuth } from '../../components/with-auth';
import { Imports } from './imports';
import { Settings } from './settings';

const AccountPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <TabGroup defaultIndex={0}>
        <TabList>
          <Tab>Settings</Tab>
          <Tab>Imports</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Settings />
          </TabPanel>
          <TabPanel>
            <Imports />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default withAuth(AccountPage);
