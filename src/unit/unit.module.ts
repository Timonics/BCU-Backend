import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/entity/unit.entity';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Member } from 'src/entity/member.entity';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit, Member]),
    forwardRef(() => MemberModule),
  ],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
