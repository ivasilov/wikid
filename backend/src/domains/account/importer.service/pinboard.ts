import { Importer, TransformInput } from './types';
import * as z from 'zod';
import { BookmarksService } from '../../bookmarks/service';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/service';
import { compact } from 'lodash';
import { Promise as Bromise } from 'bluebird';
import { RequestContext } from '../../../app';

const bookmarkSchema = z.object({
  href: z.string(),
  description: z.string(),
  extended: z.string(),
  meta: z.string(),
  hash: z.string(),
  shared: z.string(),
  time: z.string(),
  toread: z.enum(['yes', 'no']),
  tags: z.string(),
});

const bookmarksSchema = z.array(bookmarkSchema);

@Injectable()
export class PinboardImporter implements Importer {
  constructor(private bookmarks: BookmarksService, private usersService: UsersService) {}

  transform = async (ctx: RequestContext, params: TransformInput) => {
    let parsed = {};
    try {
      parsed = JSON.parse(params.data);
    } catch (e) {
      throw new Error('An error happened while trying to import the Pinboard data.');
    }
    const validated = bookmarksSchema.parse(parsed);
    const user = await this.usersService.findById(ctx, params.userId);

    return Bromise.map(
      validated,
      b => {
        // pinboard tags are one string delimited by spaces
        const pages = b.tags.split(' ');

        const pageIds = compact(pages).map(p => ({ id: undefined, name: p }));

        const translated = {
          url: b.href,
          name: b.description,
          read: b.toread !== 'yes',
          pageIds,
        };

        // this method will create a new bookmark and link all pages to the bookmark. If pages under that name are
        // non-existant, they will be created also.
        return this.bookmarks.create(ctx, translated, user);
      },
      { concurrency: 1 },
    );
  };
}
