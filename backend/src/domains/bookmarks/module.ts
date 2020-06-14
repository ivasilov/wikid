import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { bookmarkProviders } from './provider';
import { BookmarksService } from './service';
import { BookmarksResolver } from './resolver';
import { PagesModule } from '../pages';

@Module({
  imports: [DatabaseModule, PagesModule],
  providers: [...bookmarkProviders, BookmarksService, BookmarksResolver],
  exports: [BookmarksService],
})
export class BookmarksModule {}
