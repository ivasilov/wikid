import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserBookmarksPagesRelations1593385976666 implements MigrationInterface {
    name = 'addUserBookmarksPagesRelations1593385976666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "userId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD "userId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04"`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "userId"`, undefined);
    }

}
