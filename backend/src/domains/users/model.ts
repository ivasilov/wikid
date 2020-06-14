import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BookmarkModel } from '../bookmarks/model';
import { PageModel } from '../pages/model';

@ObjectType('User')
export class UserModel {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;

  @Field(type => [PageModel])
  pages: PageModel[];

  @Field(type => [BookmarkModel])
  bookmarks: BookmarkModel[];
}
