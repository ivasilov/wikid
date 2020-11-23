import { BookmarksService } from '../../bookmarks/service';
import { Importer, TransformInput } from './types';
import { compact } from 'lodash';

export class OneTabImporter implements Importer {
  constructor(private bookmarks: BookmarksService) {}

  transform = (params: TransformInput) => {
    const validated = params.data.split('\n');
    const compacted = compact(validated);

    return Promise.all(
      compacted.map(b => {
        const [url, ...rest] = b;

        const translated = {
          url: url,
          name: rest.join(' | '),
          pageIds: [],
        };

        return this.bookmarks.create(translated, params.userId);
      }),
    );
  };
}
