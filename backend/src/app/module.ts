import { Module } from '@nestjs/common';
import { AppService } from './service';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { BookmarksModule } from '../domains/bookmarks';
import { PagesModule } from '../domains/pages';
import { AuthModule } from '../domains/auth';
import { UsersModule } from '../domains/users';
import { AccountModule } from '../domains/account';
import { DatabaseModule, TransactionInterceptor } from '../database';
import { RequestContextInterceptor } from './request-context-interceptor';

const frontendPath = join(__dirname, '..', '..', '..', 'frontend', 'build');

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      path: '/api',
      context: ({ req }) => ({ req }),
      cors: {}, // pass options here
    }),
    BookmarksModule,
    PagesModule,
    AuthModule,
    UsersModule,
    AccountModule,
    ServeStaticModule.forRoot({ rootPath: frontendPath }),
  ],
  providers: [
    AppService,
    // The order of the interceptors should be kept like this because the Transaction one uses request context
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransactionInterceptor,
    },
  ],
})
export class AppModule {}
