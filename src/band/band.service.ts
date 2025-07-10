import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from 'src/entity/band.entity';
import { Repository } from 'typeorm';
import { CreateBandDto } from './dto/create_band.dto';
import { UpdateBandDto } from './dto/update_band.dto';
import { Member } from 'src/entity/member.entity';

@Injectable()
export class BandService {
  constructor(
    @InjectRepository(Band)
    private readonly bandRepository: Repository<Band>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Band[]> {
    return this.bandRepository
      .createQueryBuilder('band')
      .leftJoinAndSelect('band.members', 'members')
      .leftJoinAndSelect('members.unit', 'unit')
      .select(['band', 'members', 'unit.id', 'unit.name'])
      .getMany();
  }

  async findBandById(id: number): Promise<Band | null> {
    return this.bandRepository
      .createQueryBuilder('band')
      .where('band.id = :id', { id })
      .leftJoinAndSelect('band.members', 'members')
      .leftJoinAndSelect('members.unit', 'unit')
      .select(['band', 'members', 'unit.id', 'unit.name'])
      .getOne();
  }

  async create(bandData: CreateBandDto) {
    const band = this.bandRepository.create(bandData);

    if (bandData.bandCaptainId) {
      const bandCaptain = await this.memberRepository.findOne({
        where: {
          id: bandData.bandCaptainId,
        },
      });
      if (!bandCaptain)
        throw new NotFoundException(
          `Band with ID ${bandData.bandCaptainId} not found`,
        );
      band.bandCaptain = bandCaptain;
    }

    return this.bandRepository.save(band);
  }

  async update(bandId: number, bandUpdateData: Partial<UpdateBandDto>) {
    let bandExists = await this.bandRepository.findOne({
      where: { id: bandId },
    });

    if (!bandExists) {
      throw new NotFoundException(`Band with ID ${bandId} not found`);
    }

    if (bandUpdateData.bandCaptainId) {
      const bandCaptain = await this.memberRepository.findOne({
        where: { id: bandUpdateData.bandCaptainId },
      });
      if (!bandCaptain)
        throw new NotFoundException(
          `Band with ID ${bandUpdateData.bandCaptainId} not found`,
        );
      bandExists.bandCaptain = bandCaptain;
    }

    Object.keys(bandUpdateData).forEach((key) => {
      if (bandUpdateData[key] !== undefined && bandUpdateData[key] !== null) {
        bandExists[key] = bandUpdateData[key];
      }
    });

    return this.bandRepository.save(bandExists);
  }
}
