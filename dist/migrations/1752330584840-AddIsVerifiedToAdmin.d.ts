import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddIsVerifiedToAdmin1752330584840 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
