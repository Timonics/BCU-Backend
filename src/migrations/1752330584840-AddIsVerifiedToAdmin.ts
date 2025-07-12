import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsVerifiedToAdmin1752330584840 implements MigrationInterface {
    name = 'AddIsVerifiedToAdmin1752330584840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "isVerified"`);
    }

}
