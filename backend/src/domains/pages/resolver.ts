import { Resolver, Query, ResolveField, Parent, Args, Mutation, InputType, Field, ID } from '@nestjs/graphql';
import { PagesService } from '../pages/service';
import { PageModel } from './model';
import { BookmarkModel } from '../bookmarks/model';
import { PageEntity } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.guard';
import { CurrentUser } from '../auth/currentUser';

@InputType()
export class CreatePageInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  content: string;

  @Field(type => [ID], { nullable: true })
  bookmarkIds: string[];
}

@InputType()
class UpdatePageInput {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  content: string;
}

@UseGuards(GqlAuthGuard)
@Resolver(PageModel)
export class PagesResolver {
  constructor(private pagesService: PagesService) {}

  @Mutation(returns => PageModel)
  createPage(@CurrentUser() user: { id: string }, @Args('params') params: CreatePageInput) {
    return this.pagesService.create(params, user.id);
  }

  @Mutation(returns => PageModel)
  updatePage(@CurrentUser() user: { id: string }, @Args('params') params: UpdatePageInput) {
    return this.pagesService.update(params, user.id);
  }

  @Mutation(returns => ID)
  deletePage(@Args('id', { type: () => ID }) id: string) {
    return id;
  }

  @Query(returns => [PageModel], { name: 'currentUserPages' })
  currentUserPages(
    @CurrentUser() user: { id: string },
    @Args('cursor', { nullable: true }) cursor?: string,
  ): Promise<PageModel[]> {
    return this.pagesService.getPagesByUserId(user.id);
  }

  @Query(returns => PageModel, { name: 'page' })
  page(@Args('id', { type: () => ID }) id: string): Promise<PageModel> {
    return this.pagesService.findByIds([id]).then(pages => pages[0]);
  }

  @ResolveField(returns => [BookmarkModel])
  bookmarks(@Parent() page: PageEntity) {
    const { id } = page;
    return this.pagesService.getBookmarksByPageId({ id });
  }
}
