import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { DatabaseModule } from '../../database/module';
import { userProviders } from './provider';
import { UsersResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
