import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import NextServer from 'next/dist/server/next-server';
import { NEXTJS_CONFIG, NEXTJS_FRONTEND_PATH } from './constants';

@Injectable()
export class NextJSMiddleware implements NestMiddleware {
  nextServer: NextServer;

  constructor(@Inject(NEXTJS_FRONTEND_PATH) path: string, @Inject(NEXTJS_CONFIG) config: any) {
    this.nextServer = new NextServer({
      hostname: 'localhost',
      dir: path,
      dev: false,
      customServer: false,
      conf: config,
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const handler = this.nextServer.getRequestHandler();
    return handler(req, res);
  }
}
