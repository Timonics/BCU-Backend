import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { config } from 'dotenv';
import { Member } from 'src/entity/member.entity';
import { CreateMemberDto } from './dto/create_member.dto';
import { UpdateMemberDto } from './dto/update_member.dto';
import { MemberMetaData } from './dto/member_metadata.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

config();

@ApiTags('Members')
@ApiBearerAuth('access-token')
@Controller(`${process.env.API}members`)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all members with metadata' })
  @ApiOkResponse({
    description: 'List of members with metadata',
    schema: {
      type: 'object',
      properties: {
        members: {
          type: 'array',
          items: { $ref: '#/components/schemas/Member' },
        },
        meta: { $ref: '#/components/schemas/MemberMetaData' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'No members found',
    type: String,
  })
  async findAllMembers(): Promise<
    { members: Member[]; meta: MemberMetaData } | string
  > {
    const members = await this.memberService.findAll();
    if (members.length === 0) {
      return 'No members found';
    }
    const metaData = await this.memberService.memberMetaData();

    return {
      members: members,
      meta: metaData,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a member by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to retrieve',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The found member record',
    type: Member,
  })
  @ApiNotFoundResponse({
    description: 'Member not found',
  })
  async findMember(@Param('id') id: number): Promise<Member | null> {
    const member = await this.memberService.findOneById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    return member;
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get members statistics' })
  @ApiOkResponse({
    description: 'Members statistics data',
    type: MemberMetaData,
  })
  async getMembersStats() {
    const metadata = await this.memberService.memberMetaData();
    return metadata;
  }

  @Post('add-member')
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({
    type: CreateMemberDto,
    description: 'Member data to create',
  })
  @ApiCreatedResponse({
    description: 'Member successfully created',
    type: Member,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async createMember(@Body() memberData: CreateMemberDto) {
    return await this.memberService.create(memberData);
  }

  @Put('update-member/:id')
  @ApiOperation({ summary: 'Update a member' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to update',
    type: Number,
  })
  @ApiBody({
    type: UpdateMemberDto,
    description: 'Member data to update',
  })
  @ApiOkResponse({
    description: 'Member successfully updated',
    type: Member,
  })
  @ApiNotFoundResponse({
    description: 'Member not found',
  })
  async updateMember(
    @Param('id') id: number,
    @Body() memberUpdateData: Partial<UpdateMemberDto>,
  ) {
    return await this.memberService.update(id, memberUpdateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member' })
  @ApiParam({
    name: 'id',
    description: 'ID of the member to delete',
    type: Number,
  })
  @ApiOkResponse({
    description: 'Member successfully deleted',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Member 1 deleted successfully',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Member not found',
  })
  async deleteMember(@Param('id') id: number) {
    await this.memberService.delete(id);
    return { message: `Member ${id} deleted successfully` };
  }
}
