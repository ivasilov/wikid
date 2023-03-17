import { Injectable } from '@nestjs/common';
import { compact } from 'lodash';
import { RequestContext } from '../../../app';
import { BookmarksService } from '../../bookmarks/service';
import { UsersService } from '../../users/service';
import { Importer, TransformInput } from './types';

@Injectable()
export class OneTabImporter implements Importer {
  constructor(private bookmarks: BookmarksService, private users: UsersService) {}

  transform = async (ctx: RequestContext, params: TransformInput) => {
    const validated = params.data.split('\n');
    const compacted = compact(validated);
    const user = await this.users.findById(ctx, params.userId);

    return Promise.all(
      compacted.map(b => {
        const splitted = b.split('|');
        const [url, ...rest] = splitted;

        const translated = {
          url: (url ?? '').trim(),
          name: compact(rest.map(e => (e ?? '').trim())).join(' | '),
          pageIds: [],
        };

        return this.bookmarks.create(ctx, translated, user);
      }),
    );
  };
}
