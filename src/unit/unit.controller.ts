import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { UnitService } from "./unit.service";
import { Unit } from "src/entity/unit.entity";
import { UpdateUnitDto } from "./dto/update_unit.dto";
import { CreateUnitDto } from "./dto/create_unit.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("Units")
@ApiBearerAuth("access-token")
@Controller("units")
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  @ApiOperation({
    summary: "Get paginated list of units with metadata",
    description: "Returns a paginated list of units with filtering, sorting.",
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
    description: "Field to sort by (id, name, gender)",
    example: "name",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    enum: ["ASC", "DESC"],
    description: "Sort order (ASC or DESC)",
    example: "ASC",
  })
  @ApiOkResponse({
    description: "Paginated list of units with metadata",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: { $ref: "#/components/schemas/Unit" },
        },
        meta: {
          type: "object",
          properties: {
            totalPages: { type: "number", example: 100 },
            currentPage: { type: "number", example: 1 },
            limit: { type: "number", example: 10 },
            totalUnits: { type: "number", example: 100 },
            totalUnitLeaders: { type: "number", example: 100 },
            hasPrev: { type: "boolean", example: "true" },
            hasNext: { type: "boolean", example: "true" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "No units found",
    type: String,
  })
  async findAllUnits(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("sortBy") sortBy: string = "id",
    @Query("sortOrder") sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<
    | {
        units: Unit[];
        meta: {
          totalPages: number;
          currentPage: number;
          limit: number;
          totalUnits: number;
          totalUnitLeaders: number;
          hasPrev: boolean;
          hasNext: boolean;
        };
      }
    | string
  > {
    const unitsData = await this.unitService.findAll(
      page,
      limit,
      sortBy,
      sortOrder
    );
    if (!unitsData.units.length) {
      return "No units found";
    }
    return unitsData;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get unit by ID",
    description: "Retrieves a specific unit by its ID",
  })
  @ApiParam({
    name: "id",
    description: "Unit ID",
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: "Unit retrieved successfully",
    type: Unit,
  })
  @ApiNotFoundResponse({
    description: "Unit not found",
  })
  async findUnit(@Param("id") id: number): Promise<Unit | null> {
    const unit = await this.unitService.findUnitById(id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    return unit;
  }

  @Post("add-unit")
  @ApiOperation({
    summary: "Create a new unit",
    description: "Creates a new unit with the provided data",
  })
  @ApiBody({
    description: "Unit creation data",
    type: CreateUnitDto,
  })
  @ApiCreatedResponse({
    description: "Unit created successfully",
    type: Unit,
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
  })
  async createUnit(@Body() unitData: CreateUnitDto) {
    return await this.unitService.create(unitData);
  }

  @Put("update-unit/:id")
  @ApiOperation({
    summary: "Update a unit",
    description: "Updates an existing unit with partial or complete data",
  })
  @ApiParam({
    name: "id",
    description: "Unit ID to update",
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: "Unit update data (partial updates allowed)",
    type: UpdateUnitDto,
  })
  @ApiOkResponse({
    description: "Unit updated successfully",
    type: Unit,
  })
  @ApiNotFoundResponse({
    description: "Unit not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
  })
  async updateUnit(
    @Param("id") id: number,
    @Body() updateUnitData: Partial<UpdateUnitDto>
  ) {
    return await this.unitService.update(id, updateUnitData);
  }
}
