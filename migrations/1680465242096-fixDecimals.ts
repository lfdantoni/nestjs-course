import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDecimals1680465242096 implements MigrationInterface {
    name = 'fixDecimals1680465242096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "price" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lng" numeric(10,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" numeric(10,4) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "mileage" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "mileage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "price" integer NOT NULL`);
    }

}
