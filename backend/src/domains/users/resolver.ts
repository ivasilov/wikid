import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Ctx, RequestContext } from '../../app';
import { CurrentUser } from '../auth/currentUser';
import { GqlAuthGuard } from '../auth/gql.guard';
import { UserModel } from './model';
import { UsersService } from './service';

@UseGuards(GqlAuthGuard)
@Resolver(UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => UserModel)
  currentUser(@Ctx() ctx: RequestContext, @CurrentUser() user: { id: string }) {
    return this.usersService.findById(ctx, user.id);
  }
}
