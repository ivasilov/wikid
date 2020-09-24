import { Resolver, Query } from '@nestjs/graphql';
import { UserModel } from './model';
import { UsersService } from './service';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => UserModel)
  currentUser(@CurrentUser() user: { id: string }) {
    return this.usersService.findById(user.id);
  }
}
