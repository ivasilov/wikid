import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { BookmarksModule } from '../bookmarks';
import { UsersModule } from '../users';
import { ImporterProviders } from './importer.service';
import { AccountResolver } from './resolver';

@Module({
  imports: [DatabaseModule, BookmarksModule, UsersModule],
  providers: [AccountResolver, ...ImporterProviders],
  exports: [],
})
export class AccountModule {}
