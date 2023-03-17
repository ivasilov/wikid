import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { UsersResolver } from './resolver';
import { UsersService } from './service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
