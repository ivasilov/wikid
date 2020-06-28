import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BOOKMARKS_REPOSITORY } from '../../constants';
import { BookmarkEntity } from './entity';
import { PagesService } from '../pages/service';
import { PageEntity } from '../pages/entity';

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

  getBookmarksByUserId = (id: string) => {
    return this.bookmarkRepository.find({ where: { user: id } });
  };

  create = async (b: { url: string; name: string; pageIds: string[] }) => {
    let bookmark = {
      url: b.url,
      name: b.name,
      pages: [] as PageEntity[],
    };

    if (b.pageIds) {
      const pages = await this.pagesService.findByIds(b.pageIds);

      bookmark.pages = pages;
    }
    return this.bookmarkRepository.save(bookmark);
  };

  update = async (b: { id: string; url: string; name: string; pageIds: string[] }) => {
    const found = await this.bookmarkRepository.findOneOrFail({ id: b.id });
    found.url = b.url ?? found.url;
    found.name = b.name ?? found.name;
    if (b.pageIds) {
      const pages = await this.pagesService.findByIds(b.pageIds);

      found.pages = pages;
    }
    return this.bookmarkRepository.save(found);
  };
}
