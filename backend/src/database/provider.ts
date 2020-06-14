import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants';

// have to use a require here so that it doesn't get copied into the build folder
const config = require('../../ormconfig.json');

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection(config),
  },
];
