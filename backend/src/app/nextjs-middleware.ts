import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import NextServer from 'next/dist/server/next-server';
import { join } from 'path';

const frontendPath = join(__dirname, '..', '..', '..', 'frontend', 'build');

@Injectable()
export class NextJSMiddleware implements NestMiddleware {
  nextServer: NextServer;

  constructor() {
    this.nextServer = new NextServer({
      hostname: 'localhost',
      dir: frontendPath,
      dev: false,
      customServer: false,
      conf: {
        env: {},
        webpackDevMiddleware: null,
        eslint: { ignoreDuringBuilds: false },
        typescript: { ignoreBuildErrors: false, tsconfigPath: 'tsconfig.json' },
        distDir: './.next',
        cleanDistDir: true,
        assetPrefix: '',
        configOrigin: 'next.config.js',
        useFileSystemPublicRoutes: true,
        generateEtags: true,
        pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
        target: 'server',
        poweredByHeader: true,
        compress: true,
        analyticsId: '',
        images: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: '/_next/image',
          loader: 'default',
          loaderFile: '',
          domains: [],
          disableStaticImages: false,
          minimumCacheTTL: 60,
          formats: ['image/webp'],
          dangerouslyAllowSVG: false,
          contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
          remotePatterns: [],
          unoptimized: false,
        },
        devIndicators: { buildActivity: true, buildActivityPosition: 'bottom-right' },
        onDemandEntries: { maxInactiveAge: 15000, pagesBufferLength: 2 },
        amp: { canonicalBase: '' },
        basePath: '',
        sassOptions: {},
        trailingSlash: false,
        i18n: null,
        productionBrowserSourceMaps: false,
        optimizeFonts: true,
        excludeDefaultMomentLocales: true,
        serverRuntimeConfig: {},
        publicRuntimeConfig: {},
        reactStrictMode: true,
        httpAgentOptions: { keepAlive: true },
        outputFileTracing: true,
        staticPageGenerationTimeout: 60,
        swcMinify: true,
        output: 'standalone',
        experimental: {
          preCompiledNextServer: false,
          fetchCache: false,
          middlewarePrefetch: 'flexible',
          optimisticClientCache: true,
          manualClientBasePath: false,
          legacyBrowsers: false,
          newNextLinkBehavior: true,
          cpus: 3,
          sharedPool: true,
          isrFlushToDisk: true,
          workerThreads: false,
          pageEnv: false,
          optimizeCss: false,
          nextScriptWorkers: false,
          scrollRestoration: false,
          externalDir: false,
          disableOptimizedLoading: false,
          gzipSize: true,
          swcFileReading: true,
          craCompat: false,
          esmExternals: true,
          appDir: false,
          isrMemoryCacheSize: 52428800,
          fullySpecified: false,
          outputFileTracingRoot: '',
          swcTraceProfiling: false,
          forceSwcTransforms: false,
          largePageDataBytes: 128000,
          enableUndici: false,
          adjustFontFallbacks: false,
          adjustFontFallbacksWithSizeAdjust: false,
          fontLoaders: [{ loader: '@next/font/google' }, { loader: '@next/font/local' }],
          // trustHostHeader: false,
        },
        configFileName: 'next.config.js',
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const handler = this.nextServer.getRequestHandler();
    return handler(req, res);
  }
}
