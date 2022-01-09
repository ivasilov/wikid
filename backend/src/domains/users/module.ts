import { Module } from '@nestjs/common';
import { UsersService } from './service';
import { DatabaseModule } from '../../database/module';
import { UsersResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
