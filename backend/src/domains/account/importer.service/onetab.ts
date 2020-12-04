import { BookmarksService } from '../../bookmarks/service';
import { Importer, TransformInput } from './types';
import { compact } from 'lodash';
import { UsersService } from '../../users/service';

export class OneTabImporter implements Importer {
  constructor(private bookmarks: BookmarksService, private usersService: UsersService) {}

  transform = async (params: TransformInput) => {
    const validated = params.data.split('\n');
    const compacted = compact(validated);
    const user = await this.usersService.findById(params.userId);

    return Promise.all(
      compacted.map(b => {
        const [url, ...rest] = b;

        const translated = {
          url: url,
          name: rest.join(' | '),
          pageIds: [],
        };

        return this.bookmarks.create(translated, user);
      }),
    );
  };
}
