import {MigrationInterface, QueryRunner} from "typeorm";

export class addNonNullabletoPage1593822039520 implements MigrationInterface {
    name = 'addNonNullabletoPage1593822039520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04"`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "userId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04"`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_9a7bd99d7450d1c6186ef48fd04" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
