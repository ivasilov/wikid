import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { RequestContext } from '../../../app';
import { OneTabImporter } from './onetab';
import { PinboardImporter } from './pinboard';
import { Importer } from './types';

const importers: Record<string, any> = {
  onetab: OneTabImporter,
  pinboard: PinboardImporter,
};

@Injectable({ scope: Scope.TRANSIENT })
export class ImporterService {
  constructor(private moduleRef: ModuleRef) {}

  async import(
    ctx: RequestContext,
    type: string,
    str: string,
    pages: { id: string; name: string }[],
    currentUserId: string,
  ) {
    const klass = importers[type];

    if (!klass) {
      throw new Error(`Data from ${type} can't be imported.`);
    }

    const importer = (await this.moduleRef.resolve(klass)) as Importer;

    importer.transform(ctx, { data: str, pages, userId: currentUserId });
  }
}

export const ImporterProviders = [ImporterService, OneTabImporter, PinboardImporter];
