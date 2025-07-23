"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintToLeadershipType1753038446967 = void 0;
class AddConstraintToLeadershipType1753038446967 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "leadership_position" ADD CONSTRAINT "UQ_leadership_position_type" UNIQUE ("type")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "leadership_position" DROP CONSTRAINT "UQ_leadership_position_type"`);
    }
}
exports.AddConstraintToLeadershipType1753038446967 = AddConstraintToLeadershipType1753038446967;
//# sourceMappingURL=1753038446967-AddConstraintToLeadershipType.js.map