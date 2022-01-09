import { Injectable } from '@nestjs/common';
import { buildPaginator } from 'typeorm-cursor-pagination';
import { BookmarkEntity } from './entity';
import { PagesService } from '../pages/service';
import { PageEntity } from '../pages/entity';
import { UserEntity } from '../users/entity';
import { TransactionalConnection } from '../../database';
import { RequestContext } from '../../app';

@Injectable()
export class BookmarksService {
  constructor(private connection: TransactionalConnection, private pagesService: PagesService) {}

  async findOneById(ctx: RequestContext, id: string) {
    return this.connection.getRepository(ctx, BookmarkEntity).findOneOrFail(id);
  }

  getPagesByBookmarkId(ctx: RequestContext, { id }: { id: string }) {
    return this.connection
      .getRepository(ctx, BookmarkEntity)
      .createQueryBuilder('getBookmarkPages')
      .relation(BookmarkEntity, 'pages')
      .of(id)
      .loadMany() as Promise<PageEntity[]>;
  }

  getBookmarksByUserId = async (ctx: RequestContext, id: string, showOnlyUnread: boolean, nextCursor?: string) => {
    const criteria = { user: id } as any;
    // if the flag is true, filter out all read bookmarks
    if (showOnlyUnread) {
      criteria.read = false;
    }

    const queryBuilder = this.connection
      .getRepository(ctx, BookmarkEntity)
      .createQueryBuilder('bookmarks')
      .where(criteria);

    const paginator = buildPaginator({
      entity: BookmarkEntity,
      alias: 'bookmarks',
      query: {
        limit: 10,
        order: 'ASC',
        afterCursor: nextCursor,
      },
    });

    // Pass queryBuilder as parameter to get paginate result.
    const { data, cursor } = await paginator.paginate(queryBuilder);
    return { bookmarks: data, cursor: cursor.afterCursor };
  };

  create = async (
    ctx: RequestContext,
    b: { url: string; name: string; read?: boolean; pageIds: { id?: string; name: string }[] },
    user: UserEntity,
  ) => {
    let bookmark: Omit<BookmarkEntity, 'id' | 'createdAt' | 'updatedAt'> = {
      url: b.url,
      name: b.name,
      user: {} as UserEntity,
      read: b.read ?? true,
      pages: [] as PageEntity[],
    };

    bookmark.pages = await this.pagesService.upsert(ctx, b.pageIds, user);
    bookmark.user = user;

    return this.connection.getRepository(ctx, BookmarkEntity).save(bookmark);
  };

  update = async (
    ctx: RequestContext,
    b: { id: string; url: string; name: string; read: boolean; pageIds: { id: string; name: string }[] },
    user: UserEntity,
  ) => {
    const found = (await this.connection.getRepository(ctx, BookmarkEntity).findOneOrFail({ id: b.id })) as any;
    found.url = b.url ?? found.url;
    found.name = b.name ?? found.name;
    found.read = b.read ?? found.read;
    if (b.pageIds) {
      found.pages = await this.pagesService.upsert(ctx, b.pageIds, user);
    }

    return this.connection.getRepository(ctx, BookmarkEntity).save(found);
  };
}
