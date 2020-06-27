import { Module } from '@nestjs/common';
import { AppService } from './service';
import { AppController } from './controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BookmarksModule } from '../domains/bookmarks';
import { PagesModule } from '../domains/pages';
import { AuthModule } from '../domains/auth';
import { UsersModule } from '../domains/users';

const frontendPath = join(__dirname, '..', '..', '..', 'frontend', 'build');
console.log(frontendPath);

@Module({
  imports: [
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
    ServeStaticModule.forRoot({
      rootPath: frontendPath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
