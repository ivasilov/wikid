import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PageEntity } from '../pages/entity';
import { UserEntity } from '../users/entity';

@Entity('bookmarks')
export abstract class BookmarkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @ManyToOne(
    type => UserEntity,
    user => user.bookmarks,
    { nullable: false },
  )
  user: UserEntity;

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

  @Column()
  read: boolean;
}
