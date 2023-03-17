import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Ctx, RequestContext } from '../../app';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { PageModel } from '../pages/model';
import { UsersService } from '../users/service';
import { BookmarkEntity } from './entity';
import { BookmarkModel } from './model';
import { BookmarksService } from './service';

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

@InputType()
export class SearchInput {
  @Field()
  term: string;

  @Field({ nullable: true })
  cursor?: string;
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
  async createBookmark(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('params') params: CreateBookmarkInput,
  ) {
    const found = await this.usersService.findById(ctx, user.id);
    return this.bookmarksService.create(ctx, params, found);
  }

  @Mutation(returns => BookmarkModel)
  async updateBookmark(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('params') params: UpdateBookmarkInput,
  ) {
    const found = await this.usersService.findById(ctx, user.id);
    return this.bookmarksService.update(ctx, params, found);
  }

  @Mutation(returns => ID)
  deleteBookmark(@Args('id', { type: () => ID }) id: string) {
    return id;
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'currentUserBookmarks' })
  currentUserBookmarks(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('cursor', { nullable: true }) cursor?: string,
  ) {
    return this.bookmarksService.getBookmarksByUserId(ctx, user.id, false, cursor);
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'currentUserUnreadBookmarks' })
  currentUserUnreadBookmarks(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('cursor', { nullable: true }) cursor?: string,
  ) {
    return this.bookmarksService.getBookmarksByUserId(ctx, user.id, true, cursor);
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'search' })
  search(@Ctx() ctx: RequestContext, @CurrentUser() user: { id: string }, @Args('params') params: SearchInput) {
    return this.bookmarksService.search(ctx, user.id, params.term, params.cursor);
  }

  @Query(returns => BookmarkModel, { name: 'bookmark' })
  bookmark(@Ctx() ctx: RequestContext, @Args('id', { type: () => ID }) id: string): Promise<BookmarkModel> {
    return this.bookmarksService.findOneById(ctx, id);
  }

  @ResolveField(returns => [PageModel])
  pages(@Ctx() ctx: RequestContext, @Parent() bookmark: BookmarkEntity) {
    const { id } = bookmark;
    return this.bookmarksService.getPagesByBookmarkId(ctx, { id });
  }
}
