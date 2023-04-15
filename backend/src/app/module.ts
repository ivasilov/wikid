import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { GRAPHQL_ENDPOINT } from '../constants';
import { DatabaseModule, TransactionInterceptor } from '../database';
import { AccountModule } from '../domains/account';
import { AuthModule } from '../domains/auth';
import { BookmarksModule } from '../domains/bookmarks';
import { PagesModule } from '../domains/pages';
import { UsersModule } from '../domains/users';
import { NextJsMiddlewareModule } from '../next-js-middleware';
import { RequestContextInterceptor } from './request-context-interceptor';

@Module({
  imports: [
    DatabaseModule,
    NextJsMiddlewareModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      path: GRAPHQL_ENDPOINT,
      // added so that the field resolvers are also intercepted and a separate transaction is created for them
      fieldResolverEnhancers: ['interceptors'],
      context: ({ req }) => ({ req }),
      cors: {}, // pass options here
    }),
    BookmarksModule,
    PagesModule,
    AuthModule,
    UsersModule,
    AccountModule,
  ],
  providers: [
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // to enable uploading files through GraphQL
    consumer.apply(graphqlUploadExpress()).forRoutes(GRAPHQL_ENDPOINT);
  }
}
