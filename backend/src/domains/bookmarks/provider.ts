import { Connection, Repository } from 'typeorm';
import { BookmarkEntity } from './entity';
import { BOOKMARKS_REPOSITORY, DATABASE_CONNECTION } from '../../constants';

export const bookmarkProviders = [
  {
    provide: BOOKMARKS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(BookmarkEntity),
    inject: [DATABASE_CONNECTION],
  },
];
