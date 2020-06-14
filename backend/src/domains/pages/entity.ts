import {
  ManyToMany,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookmarkEntity } from '../bookmarks/entity';

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

  @ManyToMany(
    type => BookmarkEntity,
    bookmark => bookmark.pages,
  )
  bookmarks: BookmarkEntity[];
}
