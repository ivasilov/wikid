import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReadFlagToBookmarks1601757406950 implements MigrationInterface {
  name = 'addReadFlagToBookmarks1601757406950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmarks" ADD "read" boolean NOT NULL DEFAULT true`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmarks" DROP COLUMN "read"`, undefined);
  }
}
