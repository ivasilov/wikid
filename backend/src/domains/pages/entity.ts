import {
  ManyToMany,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { BookmarkEntity } from '../bookmarks/entity';
import { UserEntity } from '../users/entity';

@Entity('pages')
export abstract class PageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => UserEntity,
    user => user.pages,
  )
  user: UserEntity;

  @ManyToMany(
    type => BookmarkEntity,
    bookmark => bookmark.pages,
  )
  bookmarks: BookmarkEntity[];
}
