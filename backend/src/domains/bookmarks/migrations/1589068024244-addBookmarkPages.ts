import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBookmarkPages1589068024244 implements MigrationInterface {
  name = 'addBookmarkPages1589068024244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookmarks_pages_pages" ("bookmarksId" uuid NOT NULL, "pagesId" uuid NOT NULL, CONSTRAINT "PK_aafc1d4126544a1c2e02e430dce" PRIMARY KEY ("bookmarksId", "pagesId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e75200ccfcce24ed068ccfd3d7" ON "bookmarks_pages_pages" ("bookmarksId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2c12613aeaf23640d6783eeff" ON "bookmarks_pages_pages" ("pagesId") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks_pages_pages" ADD CONSTRAINT "FK_e75200ccfcce24ed068ccfd3d7d" FOREIGN KEY ("bookmarksId") REFERENCES "bookmarks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks_pages_pages" ADD CONSTRAINT "FK_a2c12613aeaf23640d6783eeff9" FOREIGN KEY ("pagesId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks_pages_pages" DROP CONSTRAINT "FK_a2c12613aeaf23640d6783eeff9"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks_pages_pages" DROP CONSTRAINT "FK_e75200ccfcce24ed068ccfd3d7d"`,
      undefined,
    );
    await queryRunner.query(`DROP INDEX "IDX_a2c12613aeaf23640d6783eeff"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_e75200ccfcce24ed068ccfd3d7"`, undefined);
    await queryRunner.query(`DROP TABLE "bookmarks_pages_pages"`, undefined);
  }
}
