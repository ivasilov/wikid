import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniqueCompositeToPages1607033156845 implements MigrationInterface {
  name = 'addUniqueCompositeToPages1607033156845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookmarks" ALTER COLUMN "read" DROP DEFAULT`, undefined);
    await queryRunner.query(
      `ALTER TABLE "pages" ADD CONSTRAINT "UQ_ec92c3fc29205a1fa2bbb4c9281" UNIQUE ("name", "userId")`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "UQ_ec92c3fc29205a1fa2bbb4c9281"`, undefined);
    await queryRunner.query(`ALTER TABLE "bookmarks" ALTER COLUMN "read" SET DEFAULT true`, undefined);
  }
}
