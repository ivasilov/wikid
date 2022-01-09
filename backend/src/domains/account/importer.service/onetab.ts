import { BookmarksService } from '../../bookmarks/service';
import { Importer, TransformInput } from './types';
import { compact } from 'lodash';
import { UsersService } from '../../users/service';
import { RequestContext } from '../../../app';

export class OneTabImporter implements Importer {
  constructor(private bookmarks: BookmarksService, private usersService: UsersService) {}

  transform = async (ctx: RequestContext, params: TransformInput) => {
    const validated = params.data.split('\n');
    const compacted = compact(validated);
    const user = await this.usersService.findById(ctx, params.userId);

    return Promise.all(
      compacted.map(b => {
        const [url, ...rest] = b;

        const translated = {
          url: url,
          name: rest.join(' | '),
          pageIds: [],
        };

        return this.bookmarks.create(ctx, translated, user);
      }),
    );
  };
}
