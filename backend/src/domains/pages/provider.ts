import { Connection } from 'typeorm';
import { PageEntity } from './entity';
import { DATABASE_CONNECTION, PAGES_REPOSITORY } from '../../constants';

export const pagesProviders = [
  {
    provide: PAGES_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(PageEntity),
    inject: [DATABASE_CONNECTION],
  },
];
