import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { UserModel } from './model';
import { UsersService } from './service';
import { CurrentUser } from '../auth/currentUser';
import { UserEntity } from './entity';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';
import { BookmarkModel } from '../bookmarks/model';
import { BookmarksService } from '../bookmarks/service';
import { PageModel } from '../pages/model';
import { PagesService } from '../pages/service';

@UseGuards(GqlAuthGuard)
@Resolver(UserModel)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private bookmarksService: BookmarksService,
    private pagesService: PagesService,
  ) {}

  @Query(returns => UserModel)
  currentUser(@CurrentUser() user: { id: string }) {
    return this.usersService.findById(user.id);
  }

  @ResolveField(returns => [BookmarkModel])
  bookmarks(@CurrentUser() user: UserEntity) {
    return this.bookmarksService.getBookmarksByUserId(user.id);
  }

  @ResolveField(returns => [PageModel])
  pages(@CurrentUser() user: UserEntity) {
    return this.pagesService.getPagesByUserId(user.id);
  }
}
