import { BookmarksService } from './service';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  ID,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { BookmarkEntity } from './entity';
import { BookmarkModel } from './model';
import { PageModel } from '../pages/model';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from '../users/service';

@InputType()
class CreateBookmarkInput {
  @Field()
  url: string;

  @Field()
  name: string;

  @Field(type => [BookmarkNullablePageInput], { nullable: true })
  pageIds: { id: string; name: string }[];
}

@InputType()
class UpdateBookmarkInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  read: boolean;

  @Field(type => [BookmarkNullablePageInput], { nullable: true })
  pageIds: { id: string; name: string }[];
}

@InputType()
export class BookmarkNullablePageInput {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  name: string;
}

@ObjectType('paginatedBookmarks', { isAbstract: true })
abstract class PaginatedBookmarksModel {
  @Field(type => String, { nullable: true })
  cursor: string;

  @Field(type => [BookmarkModel])
  bookmarks: BookmarkModel[];
}

@UseGuards(GqlAuthGuard)
@Resolver(BookmarkModel)
export class BookmarksResolver {
  constructor(private bookmarksService: BookmarksService, private usersService: UsersService) {}

  @Mutation(returns => BookmarkModel)
  async createBookmark(@CurrentUser() user: { id: string }, @Args('params') params: CreateBookmarkInput) {
    const found = await this.usersService.findById(user.id);
    return this.bookmarksService.create(params, found);
  }

  @Mutation(returns => BookmarkModel)
  async updateBookmark(@CurrentUser() user: { id: string }, @Args('params') params: UpdateBookmarkInput) {
    const found = await this.usersService.findById(user.id);
    return this.bookmarksService.update(params, found);
  }

  @Mutation(returns => ID)
  deleteBookmark(@Args('id', { type: () => ID }) id: string) {
    return id;
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'currentUserBookmarks' })
  currentUserBookmarks(@CurrentUser() user: { id: string }, @Args('cursor', { nullable: true }) cursor?: string) {
    return this.bookmarksService.getBookmarksByUserId(user.id, false, cursor);
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'currentUserUnreadBookmarks' })
  currentUserUnreadBookmarks(@CurrentUser() user: { id: string }, @Args('cursor', { nullable: true }) cursor?: string) {
    return this.bookmarksService.getBookmarksByUserId(user.id, true, cursor);
  }

  @Query(returns => BookmarkModel, { name: 'bookmark' })
  bookmark(@Args('id', { type: () => ID }) id: string): Promise<BookmarkModel> {
    return this.bookmarksService.findOneById(id);
  }

  @ResolveField(returns => [PageModel])
  pages(@Parent() bookmark: BookmarkEntity) {
    const { id } = bookmark;
    return this.bookmarksService.getPagesByBookmarkId({ id });
  }
}
