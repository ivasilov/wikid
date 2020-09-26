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
import { PagesService } from '../pages/service';
import { PageModel } from '../pages/model';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';

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

  @Field(type => [BookmarkNullablePageInput], { nullable: true })
  pageIds: { id: string; name: string }[];
}

@InputType()
class BookmarkNullablePageInput {
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
  constructor(private bookmarksService: BookmarksService, private pagesService: PagesService) {}

  @Mutation(returns => BookmarkModel)
  createBookmark(@CurrentUser() user: { id: string }, @Args('params') params: CreateBookmarkInput) {
    return this.bookmarksService.create(params, user.id);
  }

  @Mutation(returns => BookmarkModel)
  updateBookmark(@CurrentUser() user: { id: string }, @Args('params') params: UpdateBookmarkInput) {
    return this.bookmarksService.update(params, user.id);
  }

  @Mutation(returns => ID)
  deleteBookmark(@Args('id', { type: () => ID }) id: string) {
    return id;
  }

  @Query(returns => PaginatedBookmarksModel, { name: 'currentUserBookmarks' })
  currentUserBookmarks(@CurrentUser() user: { id: string }, @Args('cursor', { nullable: true }) cursor?: string) {
    return this.bookmarksService.getBookmarksByUserId(user.id, cursor);
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
