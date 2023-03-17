import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BookmarkEntity } from '../bookmarks/entity';
import { UserEntity } from '../users/entity';

@Entity('pages')
@Unique(['name', 'user'])
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

  @ManyToOne(type => UserEntity, user => user.pages, { nullable: false })
  user: UserEntity;

  @ManyToMany(type => BookmarkEntity, bookmark => bookmark.pages)
  bookmarks: BookmarkEntity[];
}
