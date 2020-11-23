import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { AccountResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [AccountResolver],
  exports: [],
})
export class AccountModule {}
