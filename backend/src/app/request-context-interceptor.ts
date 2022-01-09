import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT_KEY } from '../constants';
import { parseContext } from '../utils/parse-context';
import { RequestContext } from './request-context';

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
    return next.handle();
  }
}
