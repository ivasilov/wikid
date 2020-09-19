import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/module';
import { pagesProviders } from './provider';
import { PagesService } from './service';
import { PagesResolver } from './resolver';
import { UsersModule } from '../users';

@Module({
  imports: [DatabaseModule, forwardRef(() => UsersModule)],
  providers: [...pagesProviders, PagesService, PagesResolver],
  exports: [PagesService],
})
export class PagesModule {}
