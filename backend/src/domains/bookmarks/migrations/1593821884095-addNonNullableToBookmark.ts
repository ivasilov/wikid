import {MigrationInterface, QueryRunner} from "typeorm";

export class addNonNullableToBookmark1593821884095 implements MigrationInterface {
    name = 'addNonNullableToBookmark1593821884095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
