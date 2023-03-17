import { EntityManager, EntitySchema, ObjectType, Repository } from 'typeorm';
import { RequestContext } from '../app/request-context';
import { TRANSACTION_MANAGER_KEY } from '../constants';

export class TransactionalConnection {
  getRepository<Entity>(ctx: RequestContext, target: ObjectType<Entity> | EntitySchema<Entity>): Repository<Entity> {
    const transactionManager = this.getTransactionManager(ctx);
    if (transactionManager) {
      return transactionManager.getRepository(target);
    }
    throw new Error("Entity manager couldn't be found");
  }

  private getTransactionManager(ctx: RequestContext): EntityManager | undefined {
    return (ctx as any)[TRANSACTION_MANAGER_KEY];
  }
}
