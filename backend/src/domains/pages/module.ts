import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { UsersModule } from '../users';
import { PagesResolver } from './resolver';
import { PagesService } from './service';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [PagesService, PagesResolver],
  exports: [PagesService],
})
export class PagesModule {}
