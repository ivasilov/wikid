import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants';
import { TransactionWrapper } from './transaction-wrapper';

const providers = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () => createConnection(),
  },
  TransactionWrapper,
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
