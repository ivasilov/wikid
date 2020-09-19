import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './service';
import { DatabaseModule } from '../../database/module';
import { userProviders } from './provider';
import { UsersResolver } from './resolver';
import { BookmarksModule } from '../bookmarks';
import { PagesModule } from '../pages';

@Module({
  imports: [DatabaseModule, forwardRef(() => BookmarksModule), forwardRef(() => PagesModule)],
  providers: [...userProviders, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
