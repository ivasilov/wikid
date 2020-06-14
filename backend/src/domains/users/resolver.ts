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

@Resolver(UserModel)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private bookmarksService: BookmarksService,
    private pagesService: PagesService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => UserModel)
  currentUser(@CurrentUser() user: UserEntity) {
    console.log('currentUser', user);
    return this.usersService.findById(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(returns => [BookmarkModel])
  bookmarks() {
    return this.bookmarksService.getAllBookmarks();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(returns => [PageModel])
  pages() {
    return this.pagesService.getAllPages();
  }
}
