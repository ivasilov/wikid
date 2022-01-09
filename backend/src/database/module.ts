import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './constants';
import { TransactionWrapper } from './transaction-wrapper';
import { TransactionalConnection } from './transactional-connection';

const providers = [TransactionWrapper, TransactionalConnection];

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => createConnection(),
    },
    ...providers,
  ],
  exports: [...providers],
})
export class DatabaseModule {}
