import { Injectable, Inject } from '@nestjs/common';
import { BookmarkEntity } from '../bookmarks/entity';
import { PageEntity } from './entity';
import { Repository } from 'typeorm';
import { PAGES_REPOSITORY } from '../../constants';

@Injectable()
export class PagesService {
  constructor(@Inject(PAGES_REPOSITORY) private pagesRepository: Repository<PageEntity>) {}

  findByIds = async (ids: string[]) => {
    const pages = await this.pagesRepository.findByIds(ids);
    if (ids.length !== pages.length) {
      throw new Error('Error while trying to get pages');
    }

    return pages;
  };

  getBookmarksByPageId({ id }: { id: string }) {
    return this.pagesRepository
      .createQueryBuilder('getPageBookmarks')
      .relation(PageEntity, 'bookmarks')
      .of(id)
      .loadMany() as Promise<BookmarkEntity[]>;
  }

  create = (params: { name: string; description: string; content: string }) => {
    const page = {} as PageEntity;
    page.name = params.name;
    if (params.description) {
      page.description = params.description;
    }
    if (params.content) {
      page.content = params.content;
    }

    return this.pagesRepository.save(page);
  };

  update = (params: { id: string; name: string; description: string; content: string }) => {
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

    return this.pagesRepository.save(page).then(page => this.pagesRepository.findOneOrFail(page.id));
  };

  getPagesByUserId = (id: string) => {
    return this.pagesRepository.find({ where: { user: id } });
  };
}
