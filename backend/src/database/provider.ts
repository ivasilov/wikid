import { createConnection, ConnectionManager, ConnectionOptionsReader, ConnectionOptions } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      // This whole workaround is needed because typeorm has bugs in its connection options resolutions. I'm using
      // ConnectionOptionsReader to read env vars (if they're defined). If not, just use the json in the package
      // which can't be resolved because TypeORM fails at simple going up the directories until you find conf files.
      let option: ConnectionOptions;
      try {
        const reader = new ConnectionOptionsReader();
        let options = await reader.all();
        console.log(options);
        option = options[0];
      } catch {
        option = require('../../ormconfig.json');
      }

      return createConnection(option);
    },
  },
];
