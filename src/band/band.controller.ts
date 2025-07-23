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
import { BandService } from "./band.service";
import { Band } from "src/entity/band.entity";
import { UpdateBandDto } from "./dto/update_band.dto";
import { CreateBandDto } from "./dto/create_band.dto";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";

@ApiTags("Bands")
@ApiBearerAuth("access-token")
@Controller("bands")
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get()
  @ApiOperation({
    summary: "Get paginated list of bands with metadata",
    description: "Returns a paginated list of bands with filtering, sorting",
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
    description: "Paginated list of bands with metadata",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: { $ref: "#/components/schemas/Band" },
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
            totalBandLeaders: { type: "number", example: 40 },
            hasPrev: { type: "boolean", example: "true" },
            hasNext: { type: "boolean", example: "true" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "No bands found",
    type: String,
  })
  async findAllBands(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("sortBy") sortBy: string = "id",
    @Query("sortOrder") sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<
    | {
        bands: Band[];
        meta: {
          totalPages: number;
          currentPage: number;
          limit: number;
          totalBands: number;
          totalFemaleBands: number;
          totalMaleBands: number;
          totalBandLeaders: number;
          hasPrev: boolean;
          hasNext: boolean;
        };
      }
    | string
  > {
    const bandsData = await this.bandService.findAll(
      page,
      limit,
      sortBy,
      sortOrder
    );
    if (!bandsData.bands.length) {
      return "No bands found";
    }
    return bandsData;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get band by ID",
    description: "Retrieves a specific band by its ID",
  })
  @ApiParam({ name: "id", description: "Band ID", type: Number })
  @ApiOkResponse({
    description: "Band retrieved successfully",
    type: Band,
  })
  @ApiNotFoundResponse({ description: "Band not found" })
  async findBand(@Param("id") id: number): Promise<Band | null> {
    const band = await this.bandService.findBandById(id);
    if (!band) {
      throw new NotFoundException(`Band with ID ${id} not found`);
    }
    return band;
  }

  @Post("add-band")
  @ApiOperation({
    summary: "Create a new band",
    description: "Creates a new band with the provided data",
  })
  @ApiBody({
    description: "Band creation data",
    type: CreateBandDto,
  })
  @ApiCreatedResponse({
    description: "Band created successfully",
    type: Band,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async createBand(@Body() bandData: CreateBandDto) {
    return await this.bandService.create(bandData);
  }

  @Put("update-band/:id")
  @ApiOperation({
    summary: "Update a band",
    description: "Updates an existing band with partial or complete data",
  })
  @ApiParam({ name: "id", description: "Band ID to update", type: Number })
  @ApiBody({
    description: "Band update data (partial allowed)",
    type: UpdateBandDto,
  })
  @ApiOkResponse({
    description: "Band updated successfully",
    type: Band,
  })
  @ApiNotFoundResponse({ description: "Band not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async updateBand(
    @Param("id") id: number,
    @Body() updateBandData: Partial<UpdateBandDto>
  ) {
    return await this.bandService.update(id, updateBandData);
  }
}
