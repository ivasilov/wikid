import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app/module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // to enable uploading files through GraphQL
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(4000);
}
bootstrap();
