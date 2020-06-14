import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export abstract class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
