import { Resolver, Query, ResolveField, Parent, Args, Mutation, InputType, Field, ID } from '@nestjs/graphql';
import { PagesService } from '../pages/service';
import { PageModel } from './model';
import { BookmarkModel } from '../bookmarks/model';
import { PageEntity } from './entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.guard';

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
  createPage(@Args('params') params: CreatePageInput) {
    return this.pagesService.create(params);
  }

  @Mutation(returns => PageModel)
  updatePage(@Args('params') params: UpdatePageInput) {
    return this.pagesService.update(params);
  }

  @Mutation(returns => ID)
  deletePage(@Args('id', { type: () => ID }) id: string) {
    return id;
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
