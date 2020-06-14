import { Field, ObjectType, ID } from '@nestjs/graphql';
import { PageModel } from '../pages/model';

@ObjectType('Bookmark')
export class BookmarkModel {
  @Field(type => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field(type => [PageModel])
  pages: PageModel[];
}
