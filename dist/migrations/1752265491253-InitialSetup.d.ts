import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSetup1752265491253 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
