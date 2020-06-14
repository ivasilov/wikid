import { BookmarksService } from './service';
import { Resolver, Query, ResolveField, Parent, Args, ID, Mutation, InputType, Field } from '@nestjs/graphql';
import { BookmarkEntity } from './entity';
import { BookmarkModel } from './model';
import { PagesService } from '../pages/service';
import { PageModel } from '../pages/model';

@InputType()
class CreateBookmarkInput {
  @Field()
  url: string;

  @Field()
  name: string;

  @Field(type => [ID], { nullable: true })
  pageIds: string[];
}

@InputType()
class UpdateBookmarkInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  name: string;

  @Field(type => [UpdateBookmarkNullablePage], { nullable: true })
  pageIds: string[];
}

@InputType()
class UpdateBookmarkNullablePage {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  name: string;
}

@Resolver(BookmarkModel)
export class BookmarksResolver {
  constructor(private bookmarksService: BookmarksService, private pagesService: PagesService) {}

  @Mutation(returns => BookmarkModel)
  createBookmark(@Args('params') params: CreateBookmarkInput) {
    return this.bookmarksService.create(params);
  }

  @Mutation(returns => BookmarkModel)
  updateBookmark(@Args('params') params: UpdateBookmarkInput) {
    return this.bookmarksService.update(params);
  }

  @Mutation(returns => ID)
  deleteBookmark(@Args('id', { type: () => ID }) id: string) {
    return id;
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
