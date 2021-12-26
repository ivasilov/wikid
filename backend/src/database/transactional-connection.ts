import { EntityManager, EntitySchema, ObjectType, Repository } from 'typeorm';
import { TRANSACTION_MANAGER_KEY } from '../constants';
import { RequestContext } from '../app/request-context';

export class TransactionalConnection {
  async getRepository<Entity>(
    ctx: RequestContext,
    target: ObjectType<Entity> | EntitySchema<Entity>,
  ): Promise<Repository<Entity>> {
    const transactionManager = await this.getTransactionManager(ctx);
    if (transactionManager) {
      return transactionManager.getRepository(target);
    }
    throw new Error("Entity manager coudln't be found");
  }

  private getTransactionManager(ctx: RequestContext): EntityManager | undefined {
    return (ctx as any)[TRANSACTION_MANAGER_KEY];
  }
}
