import { ContextType, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_CONTEXT_KEY } from '../constants';

export const Ctx = createParamDecorator((data, ctx: ExecutionContext) => {
  if (ctx.getType<ContextType | 'graphql'>() === 'graphql') {
    // GraphQL request
    return ctx.getArgByIndex(2).req[REQUEST_CONTEXT_KEY];
  } else {
    // REST request
    return ctx.switchToHttp().getRequest()[REQUEST_CONTEXT_KEY];
  }
});
