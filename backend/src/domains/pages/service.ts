import { Injectable, Inject } from '@nestjs/common';
import { isNumber, compact, differenceWith } from 'lodash';
import { BookmarkEntity } from '../bookmarks/entity';
import { PageEntity } from './entity';
import { Repository } from 'typeorm';
import { PAGES_REPOSITORY } from '../../constants';
import { UsersService } from '../users/service';
import { UserEntity } from '../users/entity';

@Injectable()
export class PagesService {
  constructor(
    @Inject(PAGES_REPOSITORY) private pagesRepository: Repository<PageEntity>,
    private usersService: UsersService,
  ) {}

  findByIds = async (ids: string[]) => {
    const pages = await this.pagesRepository.findByIds(ids);
    if (ids.length !== pages.length) {
      throw new Error('Error while trying to get pages');
    }

    return pages;
  };

  findByName = async (name: string, user: UserEntity) => {
    return this.pagesRepository.findOne({ name, user });
  };

  getBookmarksByPageId({ id }: { id: string }) {
    return this.pagesRepository
      .createQueryBuilder('getPageBookmarks')
      .relation(PageEntity, 'bookmarks')
      .of(id)
      .loadMany() as Promise<BookmarkEntity[]>;
  }

  create = async (params: { name: string; description: string; content: string }, user: UserEntity) => {
    const page = {} as PageEntity;
    page.name = params.name;
    if (params.description) {
      page.description = params.description;
    }
    if (params.content) {
      page.content = params.content;
    }
    page.user = user;

    return this.pagesRepository.save(page);
  };

  update = async (params: { id: string; name: string; description: string; content: string }, userId: string) => {
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

    page.user = await this.usersService.findById(userId);

    return this.pagesRepository.save(page).then(page => this.pagesRepository.findOneOrFail(page.id));
  };

  getPagesByUserId = (id: string) => {
    return this.pagesRepository.find({ where: { user: id } });
  };

  getBookmarksCountByPageId = async (id: string) => {
    const result = await this.pagesRepository
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

  upsert = async (pageIds: { id?: string; name: string }[], user: UserEntity) => {
    const pIds = compact(pageIds.map(p => p.id));
    const pages = await this.findByIds(pIds);

    let pNames = compact(pageIds.filter(p => !p.id).map(p => p.name));

    const existingPages = compact(await Promise.all(pNames.map(name => this.findByName(name, user))));
    pNames = differenceWith(pNames, existingPages, (n, e) => n === e.name);

    const newPages = await Promise.all(pNames.map(name => this.create({ name, description: '', content: '' }, user)));

    return [...pages, ...existingPages, ...newPages];
  };
}
