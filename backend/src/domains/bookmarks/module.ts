import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { BookmarksService } from './service';
import { BookmarksResolver } from './resolver';
import { PagesModule } from '../pages';
import { UsersModule } from '../users';

@Module({
  imports: [DatabaseModule, forwardRef(() => PagesModule), UsersModule],
  providers: [BookmarksService, BookmarksResolver],
  exports: [BookmarksService],
})
export class BookmarksModule {}
