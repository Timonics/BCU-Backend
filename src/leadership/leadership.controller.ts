import { Body, Controller, Post } from '@nestjs/common';
import { LeadershipService } from './leadership.service';
import { CreateLeadershipDto } from './dto/create_leadership.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LeadershipPosition } from 'src/entity/leadership.entity';

@ApiTags('Leadership')
@ApiBearerAuth('access-token')
@Controller(`${process.env.API}leadership`)
export class LeadershpController {
  constructor(private readonly leadersipService: LeadershipService) {}

  @Post('')
  @ApiOperation({
    summary: 'Create a new leadership position',
    description: 'Creates a new leadership position in the system',
  })
  @ApiCreatedResponse({
    description: 'Leadership position successfully created',
    type: LeadershipPosition,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid data provided',
  })
  async createLeadership(
    @Body() leadershipData: CreateLeadershipDto,
  ): Promise<LeadershipPosition> {
    return await this.leadersipService.create(leadershipData);
  }
}
