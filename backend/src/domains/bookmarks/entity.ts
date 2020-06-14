import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PageEntity } from '../pages/entity';

@Entity('bookmarks')
export abstract class BookmarkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(
    type => PageEntity,
    page => page.bookmarks,
  )
  pages: PageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
