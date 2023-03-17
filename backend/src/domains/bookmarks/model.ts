import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PageModel } from '../pages/model';

@ObjectType('Bookmark')
export class BookmarkModel {
  @Field(type => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  read: boolean;

  @Field(type => [PageModel])
  pages: PageModel[];
}
