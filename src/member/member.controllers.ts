import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { MemberService } from "./member.service";
import { Member } from "src/entity/member.entity";
import { CreateMemberDto } from "./dto/create_member.dto";
import { UpdateMemberDto } from "./dto/update_member.dto";
import { MemberMetaData } from "./dto/member_metadata.dto";

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
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("Members")
@ApiBearerAuth("access-token")
@Controller("members")
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get("")
  @ApiOperation({
    summary: "Get paginated list of members with metadata",
    description:
      "Returns a paginated list of members with filtering, sorting, and metadata capabilities",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (default: 1)",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Number of items per page (default: 10)",
    example: 10,
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Field to sort by (id, firstName, lastName, email, gender)",
    example: "lastName",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    enum: ["ASC", "DESC"],
    description: "Sort order (ASC or DESC)",
    example: "ASC",
  })
  @ApiOkResponse({
    description: "Paginated list of members with metadata",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: { $ref: "#/components/schemas/Member" },
        },
        meta: {
          type: "object",
          properties: {
            totalPages: { type: "number", example: 100 },
            currentPage: { type: "number", example: 1 },
            limit: { type: "number", example: 10 },
            totalMembers: { type: "number", example: 100 },
            totalMaleMembers: { type: "number", example: 60 },
            totalFemaleMembers: { type: "number", example: 40 },
            hasPrev: { type: "boolean", example: "true" },
            hasNext: { type: "boolean", example: "true" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "No members found",
    schema: {
      type: "string",
      example: "No members found",
    },
  })
  async findAllMembers(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("sortBy") sortBy: string = "id",
    @Query("sortOrder") sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<
    | {
        members: Member[];
        meta: {
          totalPages: number;
          currentPage: number;
          limit: number;
          totalMembers: number;
          totalMaleMembers: number;
          totalFemaleMembers: number;
          hasPrev: boolean
          hasNext: boolean
        };
      }
    | string
    | undefined
  > {
    const membersData = await this.memberService.findAll(
      page,
      limit,
      sortBy,
      sortOrder
    );
    if (membersData?.members.length === 0) {
      return "No members found";
    }

    return membersData;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a member by ID" })
  @ApiParam({
    name: "id",
    description: "ID of the member to retrieve",
    type: Number,
  })
  @ApiOkResponse({
    description: "The found member record",
    type: Member,
  })
  @ApiNotFoundResponse({
    description: "Member not found",
  })
  async findMember(@Param("id") id: number): Promise<Member | null> {
    const member = await this.memberService.findOneById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    return member;
  }

  @Get("stats")
  @ApiOperation({ summary: "Get members statistics" })
  @ApiOkResponse({
    description: "Members statistics data",
    type: MemberMetaData,
  })
  async getMembersStats() {
    const metadata = await this.memberService.memberMetaData();
    return metadata;
  }

  @Post("add-member")
  @ApiOperation({ summary: "Create a new member" })
  @ApiBody({
    type: CreateMemberDto,
    description: "Member data to create",
  })
  @ApiCreatedResponse({
    description: "Member successfully created",
    type: Member,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request",
  })
  async createMember(@Body() memberData: CreateMemberDto) {
    return await this.memberService.create(memberData);
  }

  @Put("update-member/:id")
  @ApiOperation({ summary: "Update a member" })
  @ApiParam({
    name: "id",
    description: "ID of the member to update",
    type: Number,
  })
  @ApiBody({
    type: UpdateMemberDto,
    description: "Member data to update",
  })
  @ApiOkResponse({
    description: "Member successfully updated",
    type: Member,
  })
  @ApiNotFoundResponse({
    description: "Member not found",
  })
  async updateMember(
    @Param("id") id: number,
    @Body() memberUpdateData: Partial<UpdateMemberDto>
  ) {
    return await this.memberService.update(id, memberUpdateData);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a member" })
  @ApiParam({
    name: "id",
    description: "ID of the member to delete",
    type: Number,
  })
  @ApiOkResponse({
    description: "Member successfully deleted",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Member 1 deleted successfully",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: "Member not found",
  })
  async deleteMember(@Param("id") id: number) {
    await this.memberService.delete(id);
    return { message: `Member ${id} deleted successfully` };
  }
}
