import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member.service';
import { Member } from 'src/entity/member.entity';
import { MemberController } from './member.controllers';
import { BandModule } from 'src/band/band.module';
import { UnitModule } from 'src/unit/unit.module';
import { LeadershipModule } from 'src/leadership/leadership.module';
import { Unit } from 'src/entity/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Unit]), BandModule, UnitModule, LeadershipModule],
  providers: [MemberService],
  controllers: [MemberController],
  exports: [MemberService],
})
export class MemberModule {}