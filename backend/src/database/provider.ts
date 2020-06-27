import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => createConnection(),
  },
];
