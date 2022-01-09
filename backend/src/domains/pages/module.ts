import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { PagesService } from './service';
import { PagesResolver } from './resolver';
import { UsersModule } from '../users';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [PagesService, PagesResolver],
  exports: [PagesService],
})
export class PagesModule {}
