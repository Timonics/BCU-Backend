import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConstraintToLeadershipType1753038446967
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "leadership_position" ADD CONSTRAINT "UQ_leadership_position_type" UNIQUE ("type")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "leadership_position" DROP CONSTRAINT "UQ_leadership_position_type"`
    );
  }
}
