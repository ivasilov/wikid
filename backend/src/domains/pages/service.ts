import { Injectable } from '@nestjs/common';
import { isNumber, compact, differenceWith } from 'lodash';
import { BookmarkEntity } from '../bookmarks/entity';
import { PageEntity } from './entity';
import { UsersService } from '../users/service';
import { UserEntity } from '../users/entity';
import { RequestContext } from '../../app';
import { TransactionalConnection } from '../../database';

@Injectable()
export class PagesService {
  constructor(private connection: TransactionalConnection, private usersService: UsersService) {}

  findByIds = async (ctx: RequestContext, ids: string[]) => {
    const pages = await this.connection.getRepository(ctx, PageEntity).findByIds(ids);
    if (ids.length !== pages.length) {
      throw new Error('Error while trying to get pages');
    }

    return pages;
  };

  findByName = async (ctx: RequestContext, name: string, user: UserEntity) => {
    return this.connection.getRepository(ctx, PageEntity).findOne({ name, user });
  };

  getBookmarksByPageId(ctx: RequestContext, { id }: { id: string }) {
    return this.connection
      .getRepository(ctx, PageEntity)
      .createQueryBuilder('getPageBookmarks')
      .relation(PageEntity, 'bookmarks')
      .of(id)
      .loadMany() as Promise<BookmarkEntity[]>;
  }

  create = async (
    ctx: RequestContext,
    params: { name: string; description: string; content: string },
    user: UserEntity,
  ) => {
    const page = {} as PageEntity;
    page.name = params.name;
    if (params.description) {
      page.description = params.description;
    }
    if (params.content) {
      page.content = params.content;
    }
    page.user = user;

    return this.connection.getRepository(ctx, PageEntity).save(page);
  };

  update = async (
    ctx: RequestContext,
    params: { id: string; name: string; description: string; content: string },
    userId: string,
  ) => {
    const page = {} as PageEntity;
    page.id = params.id;
    if (params.name) {
      page.name = params.name;
    }
    if (params.description) {
      page.description = params.description;
    }
    if (params.content) {
      page.content = params.content;
    }

    page.user = await this.usersService.findById(ctx, userId);

    return this.connection
      .getRepository(ctx, PageEntity)
      .save(page)
      .then(page => this.connection.getRepository(ctx, PageEntity).findOneOrFail(page.id));
  };

  getPagesByUserId = (ctx: RequestContext, id: string) => {
    return this.connection.getRepository(ctx, PageEntity).find({ where: { user: id } });
  };

  getBookmarksCountByPageId = async (ctx: RequestContext, id: string) => {
    const result = await this.connection
      .getRepository(ctx, PageEntity)
      .createQueryBuilder('page')
      .leftJoinAndSelect('page.bookmarks', 'bookmarks')
      .where({ id: id })
      .select('COUNT(bookmarks.id)', 'count')
      .getRawOne();
    if (result && result.count && isNumber(+result.count)) {
      return +result.count;
    } else {
      return 0;
    }
  };

  upsert = async (ctx: RequestContext, pageIds: { id?: string; name: string }[], user: UserEntity) => {
    const pIds = compact(pageIds.map(p => p.id));
    const pages = await this.findByIds(ctx, pIds);

    let pNames = compact(pageIds.filter(p => !p.id).map(p => p.name));

    const existingPages = compact(await Promise.all(pNames.map(name => this.findByName(ctx, name, user))));
    pNames = differenceWith(pNames, existingPages, (n, e) => n === e.name);

    const newPages = await Promise.all(
      pNames.map(name => this.create(ctx, { name, description: '', content: '' }, user)),
    );

    return [...pages, ...existingPages, ...newPages];
  };
}
