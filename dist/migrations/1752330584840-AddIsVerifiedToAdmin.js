"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsVerifiedToAdmin1752330584840 = void 0;
class AddIsVerifiedToAdmin1752330584840 {
    name = 'AddIsVerifiedToAdmin1752330584840';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "isVerified"`);
    }
}
exports.AddIsVerifiedToAdmin1752330584840 = AddIsVerifiedToAdmin1752330584840;
//# sourceMappingURL=1752330584840-AddIsVerifiedToAdmin.js.map