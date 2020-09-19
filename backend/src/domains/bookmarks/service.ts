import { Injectable, Inject, Scope, ExecutionContext, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BOOKMARKS_REPOSITORY } from '../../constants';
import { BookmarkEntity } from './entity';
import { PagesService } from '../pages/service';
import { PageEntity } from '../pages/entity';
import { UsersService } from '../users/service';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject(BOOKMARKS_REPOSITORY) private bookmarkRepository: Repository<BookmarkEntity>,
    private pagesService: PagesService,
    private usersService: UsersService,
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

  getBookmarksByUserId = (id: string) => {
    return this.bookmarkRepository.find({ where: { user: id } });
  };

  create = async (b: { url: string; name: string; pageIds: { id: string; name: string }[] }, userId: string) => {
    let bookmark = {
      url: b.url,
      name: b.name,
      pages: [] as PageEntity[],
    } as BookmarkEntity;

    if (b.pageIds) {
      // find the existing pages
      const pIds = b.pageIds.filter(p => p.id).map(p => p.id);
      const pages = await this.pagesService.findByIds(pIds);

      const pNames = b.pageIds.filter(p => !p.id).map(p => p.name);

      const newPages = await Promise.all(
        pNames.map(name => this.pagesService.create({ name, description: '', content: '' }, userId)),
      );

      bookmark.pages = pages.concat(newPages);
    }

    bookmark.user = await this.usersService.findById(userId);

    return this.bookmarkRepository.save(bookmark);
  };

  update = async (
    b: { id: string; url: string; name: string; pageIds: { id: string; name: string }[] },
    userId: string,
  ) => {
    const found = (await this.bookmarkRepository.findOneOrFail({ id: b.id })) as any;
    found.url = b.url ?? found.url;
    found.name = b.name ?? found.name;
    if (b.pageIds) {
      // find the existing pages
      const pIds = b.pageIds.map(p => p.id);
      const pages = await this.pagesService.findByIds(pIds);

      const pNames = b.pageIds.filter(p => !p.id).map(p => p.name);

      const newPages = await Promise.all(
        pNames.map(name => this.pagesService.create({ name, description: '', content: '' }, userId)),
      );

      found.pages = pages.concat(newPages);
    }

    return this.bookmarkRepository.save(found);
  };
}
