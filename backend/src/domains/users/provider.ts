import { Connection, Repository } from 'typeorm';
import { UserEntity } from './entity';
import { DATABASE_CONNECTION, USERS_REPOSITORY } from '../../constants';

export const userProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
];
