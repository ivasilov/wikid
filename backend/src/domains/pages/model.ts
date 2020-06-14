import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BookmarkModel } from '../bookmarks/model';

@ObjectType('Page')
export class PageModel {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  content: string;

  @Field(type => [BookmarkModel])
  bookmarks: BookmarkModel[];
}
