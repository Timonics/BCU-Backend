import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Band } from "src/entity/band.entity";
import { BandController } from "./band.controller";
import { BandService } from "./band.service";
import { MemberModule } from "src/member/member.module";
import { Member } from "src/entity/member.entity";
import { LeadershipModule } from "src/leadership/leadership.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Band, Member]),
    forwardRef(() => MemberModule),
    LeadershipModule,
  ],
  controllers: [BandController],
  providers: [BandService],
  exports: [BandService],
})
export class BandModule {}
