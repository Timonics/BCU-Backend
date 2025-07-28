import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unit } from "src/entity/unit.entity";
import { UnitService } from "./unit.service";
import { UnitController } from "./unit.controller";
import { Member } from "src/entity/member.entity";
import { MemberModule } from "src/member/member.module";
import { LeadershipModule } from "src/leadership/leadership.module";
import { LeadershipPosition } from "src/entity/leadership.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit, Member, LeadershipPosition]),
    forwardRef(() => MemberModule),
    LeadershipModule,
  ],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
