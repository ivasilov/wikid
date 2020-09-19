import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { bookmarkProviders } from './provider';
import { BookmarksService } from './service';
import { BookmarksResolver } from './resolver';
import { PagesModule } from '../pages';
import { UsersModule } from '../users';

@Module({
  imports: [DatabaseModule, forwardRef(() => PagesModule), forwardRef(() => UsersModule)],
  providers: [...bookmarkProviders, BookmarksService, BookmarksResolver],
  exports: [BookmarksService],
})
export class BookmarksModule {}
