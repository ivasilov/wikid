import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { DatabaseModule } from '../../database/module';
import { userProviders } from './provider';
import { UsersResolver } from './resolver';
import { BookmarksModule } from '../bookmarks';
import { PagesModule } from '../pages';

@Module({
  imports: [DatabaseModule, BookmarksModule, PagesModule],
  providers: [...userProviders, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
