import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { parseContext } from '../utils/parse-context';
import { REQUEST_CONTEXT_KEY } from '../constants';

import { TransactionWrapper } from './transaction-wrapper';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private transactionWrapper: TransactionWrapper) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { req } = parseContext(context);
    const ctx = (req as any)[REQUEST_CONTEXT_KEY];
    if (ctx) {
      return of(this.transactionWrapper.executeInTransaction(ctx, () => next.handle()));
    } else {
      return next.handle();
    }
  }
}
