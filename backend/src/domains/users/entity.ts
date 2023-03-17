import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookmarkEntity } from '../bookmarks/entity';
import { PageEntity } from '../pages/entity';

@Entity('users')
export abstract class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => PageEntity, page => page.user)
  pages: PageEntity[];

  @OneToMany(type => BookmarkEntity, bookmark => bookmark.user)
  bookmarks: BookmarkEntity[];
}
