import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { BookmarksModule } from '../bookmarks';
import { ImporterProviders } from './importer.service';
import { AccountResolver } from './resolver';

@Module({
  imports: [DatabaseModule, BookmarksModule],
  providers: [AccountResolver, ...ImporterProviders],
  exports: [],
})
export class AccountModule {}
