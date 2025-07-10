import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/entity/unit.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create_unit.dto';
import { Member } from 'src/entity/member.entity';
import { UpdateUnitDto } from './dto/update_unit.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitRepository
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.unitHead', 'unitHead')
      .leftJoinAndSelect('unitHead.band', 'band')
      .select(['unit', 'unitHead', 'band.id', 'band.name'])
      .getMany();
  }

  async findUnitById(id: number): Promise<Unit | null> {
    return this.unitRepository
      .createQueryBuilder('unit')
      .where('unit.id = :id', { id })
      .leftJoinAndSelect('unit.unitHead', 'unitHead')
      .leftJoinAndSelect('unitHead.band', 'band')
      .select(['unit', 'unitHead', 'band.id', 'band.name'])
      .getOne();
  }

  async create(unitData: CreateUnitDto) {
    const unit = this.unitRepository.create(unitData);

    if (unitData.unitHeadId) {
      const unitHead = await this.memberRepository.findOne({
        where: {
          id: unitData.unitHeadId,
        },
      });
      if (!unitHead)
        throw new NotFoundException(
          `Unit with ID ${unitData.unitHeadId} not found`,
        );
      unit.unitHead = unitHead;
    }

    return this.unitRepository.save(unit);
  }

  async update(unitId: number, unitUpdateData: Partial<UpdateUnitDto>) {
    let unitExists = await this.unitRepository.findOne({
      where: { id: unitId },
    });

    if (!unitExists) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    if (unitUpdateData.unitHeadId) {
      const unitCaptain = await this.memberRepository.findOne({
        where: { id: unitUpdateData.unitHeadId },
      });
      if (!unitCaptain)
        throw new NotFoundException(
          `Unit with ID ${unitUpdateData.unitHeadId} not found`,
        );
      unitExists.unitHead = unitCaptain;
    }

    Object.keys(unitUpdateData).forEach((key) => {
      if (unitUpdateData[key] !== undefined && unitUpdateData[key] !== null) {
        unitExists[key] = unitUpdateData[key];
      }
    });

    return this.unitRepository.save(unitExists);
  }
}
