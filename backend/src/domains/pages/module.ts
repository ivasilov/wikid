import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { pagesProviders } from './provider';
import { PagesService } from './service';
import { PagesResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...pagesProviders, PagesService, PagesResolver],
  exports: [PagesService],
})
export class PagesModule {}
