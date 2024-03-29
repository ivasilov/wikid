import { UseGuards } from '@nestjs/common';
import { Args, Field, ID, InputType, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Ctx, RequestContext } from '../../app';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { BookmarkModel } from '../bookmarks/model';
import { PagesService } from '../pages/service';
import { UsersService } from '../users/service';
import { PageEntity } from './entity';
import { PageModel } from './model';

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
  constructor(private pagesService: PagesService, private usersService: UsersService) {}

  @Mutation(returns => PageModel)
  async createPage(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('params') params: CreatePageInput,
  ) {
    const found = await this.usersService.findById(ctx, user.id);
    return this.pagesService.create(ctx, params, found);
  }

  @Mutation(returns => PageModel)
  updatePage(@Ctx() ctx: RequestContext, @CurrentUser() user: { id: string }, @Args('params') params: UpdatePageInput) {
    return this.pagesService.update(ctx, params, user.id);
  }

  @Mutation(returns => ID)
  deletePage(@Args('id', { type: () => ID }) id: string) {
    return id;
  }

  @Query(returns => [PageModel], { name: 'currentUserPages' })
  currentUserPages(
    @Ctx() ctx: RequestContext,
    @CurrentUser() user: { id: string },
    @Args('cursor', { nullable: true }) cursor?: string,
  ): Promise<PageModel[]> {
    return this.pagesService.getPagesByUserId(ctx, user.id);
  }

  @Query(returns => PageModel, { name: 'page' })
  page(@Ctx() ctx: RequestContext, @Args('id', { type: () => ID }) id: string): Promise<PageModel> {
    return this.pagesService.findByIds(ctx, [id]).then(pages => pages[0]);
  }

  @ResolveField(returns => [BookmarkModel])
  bookmarks(@Ctx() ctx: RequestContext, @Parent() page: PageEntity) {
    const { id } = page;
    return this.pagesService.getBookmarksByPageId(ctx, { id });
  }

  @ResolveField(returns => Int)
  bookmarksCount(@Ctx() ctx: RequestContext, @Parent() page: PageEntity) {
    const { id } = page;
    return this.pagesService.getBookmarksCountByPageId(ctx, id);
  }
}
