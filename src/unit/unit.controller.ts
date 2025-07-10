import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from 'src/entity/unit.entity';
import { UpdateUnitDto } from './dto/update_unit.dto';
import { CreateUnitDto } from './dto/create_unit.dto';

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
} from '@nestjs/swagger';

@ApiTags('Units')
@ApiBearerAuth('access-token')
@Controller("units")
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all units',
    description:
      'Retrieves a list of all units. Returns message if no units exist.',
  })
  @ApiOkResponse({
    description: 'List of units retrieved successfully',
    type: Unit,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'No units found',
    type: String,
  })
  async findAllUnits(): Promise<Unit[] | string> {
    const units = await this.unitService.findAll();
    if (!units.length) {
      return 'No units found';
    }
    return units;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get unit by ID',
    description: 'Retrieves a specific unit by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Unit ID',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Unit retrieved successfully',
    type: Unit,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found',
  })
  async findUnit(@Param('id') id: number): Promise<Unit | null> {
    const unit = await this.unitService.findUnitById(id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    return unit;
  }

  @Post('add-unit')
  @ApiOperation({
    summary: 'Create a new unit',
    description: 'Creates a new unit with the provided data',
  })
  @ApiBody({
    description: 'Unit creation data',
    type: CreateUnitDto,
  })
  @ApiCreatedResponse({
    description: 'Unit created successfully',
    type: Unit,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  async createUnit(@Body() unitData: CreateUnitDto) {
    return await this.unitService.create(unitData);
  }

  @Put('update-unit/:id')
  @ApiOperation({
    summary: 'Update a unit',
    description: 'Updates an existing unit with partial or complete data',
  })
  @ApiParam({
    name: 'id',
    description: 'Unit ID to update',
    type: Number,
    example: 1,
  })
  @ApiBody({
    description: 'Unit update data (partial updates allowed)',
    type: UpdateUnitDto,
  })
  @ApiOkResponse({
    description: 'Unit updated successfully',
    type: Unit,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  async updateUnit(
    @Param('id') id: number,
    @Body() updateUnitData: Partial<UpdateUnitDto>,
  ) {
    return await this.unitService.update(id, updateUnitData);
  }
}
