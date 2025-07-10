import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BandService } from './band.service';
import { Band } from 'src/entity/band.entity';
import { config } from 'dotenv';
import { UpdateBandDto } from './dto/update_band.dto';
import { CreateBandDto } from './dto/create_band.dto';
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
} from '@nestjs/swagger';

config();

@ApiTags('Bands')
@ApiBearerAuth('access-token')
@Controller(`${process.env.API}bands`)
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all bands',
    description:
      'Retrieves a list of all bands. Returns empty message if no bands exist.',
  })
  @ApiOkResponse({
    description: 'List of bands retrieved successfully',
    type: Band,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'No bands found',
    type: String,
  })
  async findAllBands(): Promise<Band[] | string> {
    const bands = await this.bandService.findAll();
    if (!bands.length) {
      return 'No bands found';
    }
    return bands;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get band by ID',
    description: 'Retrieves a specific band by its ID',
  })
  @ApiParam({ name: 'id', description: 'Band ID', type: Number })
  @ApiOkResponse({
    description: 'Band retrieved successfully',
    type: Band,
  })
  @ApiNotFoundResponse({ description: 'Band not found' })
  async findBand(@Param('id') id: number): Promise<Band | null> {
    const band = await this.bandService.findBandById(id);
    if (!band) {
      throw new NotFoundException(`Band with ID ${id} not found`);
    }
    return band;
  }

  @Post('add-band')
  @ApiOperation({
    summary: 'Create a new band',
    description: 'Creates a new band with the provided data',
  })
  @ApiBody({
    description: 'Band creation data',
    type: CreateBandDto,
  })
  @ApiCreatedResponse({
    description: 'Band created successfully',
    type: Band,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async createBand(@Body() bandData: CreateBandDto) {
    return await this.bandService.create(bandData);
  }

  @Put('update-band/:id')
  @ApiOperation({
    summary: 'Update a band',
    description: 'Updates an existing band with partial or complete data',
  })
  @ApiParam({ name: 'id', description: 'Band ID to update', type: Number })
  @ApiBody({
    description: 'Band update data (partial allowed)',
    type: UpdateBandDto,
  })
  @ApiOkResponse({
    description: 'Band updated successfully',
    type: Band,
  })
  @ApiNotFoundResponse({ description: 'Band not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async updateBand(
    @Param('id') id: number,
    @Body() updateBandData: Partial<UpdateBandDto>,
  ) {
    return await this.bandService.update(id, updateBandData);
  }
}
