import { Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OneTabImporter } from './onetab';
import { PinboardImporter } from './pinboard';

const importers: Record<string, any> = {
  onetab: OneTabImporter,
  pinboard: PinboardImporter,
};

@Injectable({ scope: Scope.TRANSIENT })
export class ImporterService {
  constructor(private moduleRef: ModuleRef) {}

  async import(type: string, str: string) {
    const klass = importers[type];

    if (!klass) {
      throw new Error(`Data from ${type} can't be imported.`);
    }

    const importer = await this.moduleRef.resolve(klass);

    importer.transform(str);
  }
}
