import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType('User')
export class UserModel {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;
}
