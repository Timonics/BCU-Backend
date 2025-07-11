import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1752265491253 implements MigrationInterface {
    name = 'InitialSetup1752265491253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."band_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "band" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" "public"."band_gender_enum" NOT NULL, "foundingDate" date NOT NULL, "bandCaptainId" integer, CONSTRAINT "REL_bdb8119f6b459afc57f14d44f9" UNIQUE ("bandCaptainId"), CONSTRAINT "PK_e808d7dacf72163737ce93d7b23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "foundingDate" date NOT NULL, "unitHeadId" integer, CONSTRAINT "REL_3e9cfae430e7773d13eb63d7e7" UNIQUE ("unitHeadId"), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leadership_position_type_enum" AS ENUM('captain', 'vice captain', 'secretary', 'assistant secretary', 'unit head')`);
        await queryRunner.query(`CREATE TABLE "leadership_position" ("id" SERIAL NOT NULL, "type" "public"."leadership_position_type_enum" NOT NULL, "appointedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_85584cf81798daa16490de5b0bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."member_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "public"."member_status_enum" AS ENUM('approved', 'suspended', 'pending')`);
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "otherNames" character varying, "gender" "public"."member_gender_enum" NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "dateOfBirth" date NOT NULL, "maritalStatus" character varying NOT NULL, "stateOfOrigin" character varying NOT NULL, "address" character varying NOT NULL, "country" character varying NOT NULL, "residentialState" character varying NOT NULL, "city" character varying NOT NULL, "localGovernmentArea" character varying NOT NULL, "status" "public"."member_status_enum" NOT NULL DEFAULT 'pending', "nextOfKinFullName" character varying, "nextOfKinRelationship" character varying, "nextOfKinPhoneNumber" character varying, "baptismalStatus" boolean NOT NULL DEFAULT false, "locationOfBaptism" character varying, "institutionName" character varying, "qualification" character varying, "courseOfStudy" character varying, "startDate" date, "endDate" date, "professionalQualifications" character varying, "vocationalQualification" character varying, "placeOfWork" character varying, "officeAddress" character varying, "workState" character varying, "workLGA" character varying, "workCountry" character varying, "bandId" integer, "unitId" integer, "leadershipPositionId" integer, CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "band" ADD CONSTRAINT "FK_bdb8119f6b459afc57f14d44f9e" FOREIGN KEY ("bandCaptainId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_3e9cfae430e7773d13eb63d7e70" FOREIGN KEY ("unitHeadId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_88ac32f8d41dd1f22d2e466144b" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_1810b4497cae753af4b9bb0e42e" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_a77bb67c5ffe0b13a15a6534196" FOREIGN KEY ("leadershipPositionId") REFERENCES "leadership_position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_a77bb67c5ffe0b13a15a6534196"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_1810b4497cae753af4b9bb0e42e"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_88ac32f8d41dd1f22d2e466144b"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_3e9cfae430e7773d13eb63d7e70"`);
        await queryRunner.query(`ALTER TABLE "band" DROP CONSTRAINT "FK_bdb8119f6b459afc57f14d44f9e"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TYPE "public"."member_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."member_gender_enum"`);
        await queryRunner.query(`DROP TABLE "leadership_position"`);
        await queryRunner.query(`DROP TYPE "public"."leadership_position_type_enum"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "band"`);
        await queryRunner.query(`DROP TYPE "public"."band_gender_enum"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
