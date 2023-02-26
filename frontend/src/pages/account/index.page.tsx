import { faCog, faFileImport } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Icon, Tab, TabGroup, TabList, TabPanel, TabPanels } from '../../components';
import { withAuth } from '../../components/with-auth';
import { Imports } from './imports';
import { Settings } from './settings';

const AccountPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <TabGroup defaultIndex={0}>
        <TabList>
          <Tab>
            <Icon name={faCog} size="lg" className="mr-1" />
            Settings
          </Tab>
          <Tab>
            <Icon name={faFileImport} size="lg" className="mr-1" />
            Imports
          </Tab>
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
