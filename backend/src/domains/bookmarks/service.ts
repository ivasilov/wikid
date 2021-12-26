import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { buildPaginator } from 'typeorm-cursor-pagination';
import { BOOKMARKS_REPOSITORY } from '../../constants';
import { BookmarkEntity } from './entity';
import { PagesService } from '../pages/service';
import { PageEntity } from '../pages/entity';
import { UserEntity } from '../users/entity';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject(BOOKMARKS_REPOSITORY) private bookmarkRepository: Repository<BookmarkEntity>,
    private pagesService: PagesService,
  ) {}

  async findOneById(id: string) {
    return this.bookmarkRepository.findOneOrFail(id);
  }

  getPagesByBookmarkId({ id }: { id: string }) {
    return this.bookmarkRepository
      .createQueryBuilder('getBookmarkPages')
      .relation(BookmarkEntity, 'pages')
      .of(id)
      .loadMany() as Promise<PageEntity[]>;
  }

  getBookmarksByUserId = async (id: string, showOnlyUnread: boolean, nextCursor?: string) => {
    const criteria = { user: id } as any;
    // if the flag is true, filter out all read bookmarks
    if (showOnlyUnread) {
      criteria.read = false;
    }

    const queryBuilder = this.bookmarkRepository.createQueryBuilder('bookmarks').where(criteria);

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

    bookmark.pages = await this.pagesService.upsert(b.pageIds, user);
    bookmark.user = user;

    return this.bookmarkRepository.save(bookmark);
  };

  update = async (
    b: { id: string; url: string; name: string; read: boolean; pageIds: { id: string; name: string }[] },
    user: UserEntity,
  ) => {
    const found = (await this.bookmarkRepository.findOneOrFail({ id: b.id })) as any;
    found.url = b.url ?? found.url;
    found.name = b.name ?? found.name;
    found.read = b.read ?? found.read;
    if (b.pageIds) {
      found.pages = await this.pagesService.upsert(b.pageIds, user);
    }

    return this.bookmarkRepository.save(found);
  };
}
