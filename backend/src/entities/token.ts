import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tokens')
export abstract class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 160, unique: true, nullable: true })
  uid: string;

  @Column({ type: 'character varying', length: 60, unique: true })
  token: string;

  @Column({ type: 'bigint', nullable: true })
  ttl: number;
}
