import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT_KEY } from '../constants';
import { parseContext } from '../utils/parse-context';
import { RequestContext } from './request-context';

/**
 * @description
 * A guard which:
 *
 * 1. checks for the existence of a valid session token in the request and if found,
 * attaches the current User entity to the request.
 * 2. enforces any permissions required by the target handler (resolver, field resolver or route),
 * and throws a ForbiddenError if those permissions are not present.
 */
@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const { req } = parseContext(context);
    let requestContext: RequestContext;
    requestContext = (req as any)[REQUEST_CONTEXT_KEY];
    if (!requestContext) {
      requestContext = new RequestContext({ req });
      (req as any)[REQUEST_CONTEXT_KEY] = requestContext;
    }
    // console.log((req as any)[REQUEST_CONTEXT_KEY]);
    return next.handle();
  }
}
