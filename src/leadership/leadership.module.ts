import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadershipPosition } from 'src/entity/leadership.entity';
import { LeadershipService } from './leadership.service';
import { LeadershpController } from './leadership.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeadershipPosition])],
  controllers: [LeadershpController],
  providers: [LeadershipService],
  exports: [LeadershipService],
})
export class LeadershipModule {}
