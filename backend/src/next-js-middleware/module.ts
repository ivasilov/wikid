import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { join } from 'path';
import { NEXTJS_CONFIG, NEXTJS_FRONTEND_PATH } from './constants';
import { NextJSMiddleware } from './nextjs-middleware';

const frontendPath = join(__dirname, '..', '..', '..', 'frontend', 'build');

@Module({
  providers: [
    {
      provide: NEXTJS_FRONTEND_PATH,
      useValue: frontendPath,
    },
    {
      provide: NEXTJS_CONFIG,
      useFactory: async () => {
        const configPath = join(frontendPath, '.next', 'required-server-files.json');
        const { config } = await import(configPath);
        return config;
      },
    },
  ],
})
export class NextJsMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextJSMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
