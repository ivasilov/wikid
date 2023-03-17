import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { PagesModule } from '../pages';
import { UsersModule } from '../users';
import { BookmarksResolver } from './resolver';
import { BookmarksService } from './service';

@Module({
  imports: [DatabaseModule, forwardRef(() => PagesModule), UsersModule],
  providers: [BookmarksService, BookmarksResolver],
  exports: [BookmarksService],
})
export class BookmarksModule {}
