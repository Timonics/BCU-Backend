import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Band } from "src/entity/band.entity";
import { Not, Repository } from "typeorm";
import { CreateBandDto } from "./dto/create_band.dto";
import { UpdateBandDto } from "./dto/update_band.dto";
import { Member } from "src/entity/member.entity";
import { Gender } from "src/utils/enums/gender.enum";
import { LeadershipType } from "src/utils/enums/leadership_type.enum";
import { LeadershipService } from "src/leadership/leadership.service";

@Injectable()
export class BandService {
  private logger = new Logger(BandService.name);
  constructor(
    @InjectRepository(Band)
    private readonly bandRepository: Repository<Band>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    private leadershipService: LeadershipService
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: string = "id",
    sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<{
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
  }> {
    let totalBands: number;
    let totalFemaleBands: number;
    let totalMaleBands: number;
    let totalBandLeaders: number = 0;

    try {
      [totalBands, totalFemaleBands, totalMaleBands] = await Promise.all([
        this.bandRepository.count(),
        this.bandRepository.count({ where: { gender: Gender.FEMALE } }),
        this.bandRepository.count({ where: { gender: Gender.MALE } }),
      ]);
    } catch (error) {
      throw new InternalServerErrorException("Failed to get band counts");
    }

    const bandsQuery = await this.bandRepository
      .createQueryBuilder("bands")
      .leftJoinAndSelect("bands.members", "members")
      .getMany();

    const bandsWithMembers = bandsQuery.filter((band) => band.members.length);

    bandsWithMembers.forEach((band) => {
      const bandLeadersArr = band.members.filter(
        (member) => member.leadershipPosition?.id
      );
      totalBandLeaders = totalBandLeaders + bandLeadersArr.length;
    });

    const totalPages = Math.ceil(totalBands / limit);

    const baseQuery = this.bandRepository
      .createQueryBuilder("band")
      .leftJoinAndSelect("band.members", "members")
      .leftJoin("band.bandCaptain", "bandCaptain")
      .leftJoinAndSelect("members.unit", "unit")
      .leftJoinAndSelect("members.leadershipPosition", "leadershipPosition")
      .select([
        "band",
        "members",
        "bandCaptain.id",
        "bandCaptain.firstName",
        "bandCaptain.lastName",
        "bandCaptain.email",
        "unit.id",
        "unit.name",
        "leadershipPosition.id",
        "leadershipPosition.type",
        "leadershipPosition.appointedAt",
      ]);

    if (sortOrder) {
      const validSorts = ["id", "gender", "name"];

      if (validSorts.includes(sortBy)) {
        baseQuery.orderBy(`band.${sortBy}`, sortOrder);
      }
    }

    const data = await baseQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      bands: data,
      meta: {
        totalPages,
        currentPage: page,
        limit,
        totalBands,
        totalFemaleBands,
        totalMaleBands,
        totalBandLeaders,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    };
  }

  async findBandById(id: number): Promise<Band | null> {
    return this.bandRepository
      .createQueryBuilder("band")
      .where("band.id = :id", { id })
      .leftJoinAndSelect("band.members", "members")
      .leftJoin("band.bandCaptain", "bandCaptain")
      .leftJoinAndSelect("members.unit", "unit")
      .leftJoinAndSelect("members.leadershipPosition", "leadershipPosition")
      .select([
        "band",
        "members",
        "bandCaptain.id",
        "bandCaptain.firstName",
        "bandCaptain.lastName",
        "bandCaptain.email",
        "unit.id",
        "unit.name",
        "leadershipPosition.id",
        "leadershipPosition.type",
        "leadershipPosition.appointedAt",
      ])
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
          `Band with ID ${bandData.bandCaptainId} not found`
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
      const memberExists = await this.memberRepository.findOne({
        where: { id: bandUpdateData.bandCaptainId },
      });
      if (!memberExists)
        throw new NotFoundException(
          `Member with ID ${bandUpdateData.bandCaptainId} not found`
        );

      if (memberExists.band && memberExists.band.id !== bandExists.id) {
        throw new NotAcceptableException(
          "This member already belongs to another band"
        );
      }

      const captainAssigned = await this.assignNewCaptain(bandExists.id, {
        bandCaptainId: bandUpdateData.bandCaptainId,
      });
      if (!captainAssigned) {
        throw new NotAcceptableException(
          "Band captain was not successfully re-assigned"
        );
      }

      bandExists.bandCaptain = memberExists;
    }

    Object.keys(bandUpdateData).forEach((key) => {
      if (bandUpdateData[key] !== undefined && bandUpdateData[key] !== null) {
        bandExists[key] = bandUpdateData[key];
      }
    });

    return this.bandRepository.save(bandExists);
  }

  async assignNewCaptain(
    bandId: number,
    updateBandData: Pick<UpdateBandDto, "bandCaptainId">
  ) {
    const memberExists = await this.memberRepository.findOne({
      where: {
        id: updateBandData.bandCaptainId,
      },
    });
    if (!memberExists) {
      throw new NotFoundException(`Member with ID ${bandId} not found`);
    }

    const bandExists = await this.bandRepository.findOne({
      where: {
        id: bandId,
      },
    });
    if (!bandExists) {
      throw new NotFoundException(`Band with ID ${bandId} not found`);
    }

    const existingCaptain = await this.memberRepository.findOne({
      where: {
        band: { id: bandExists.id },
        leadershipPosition: { type: LeadershipType.CAPTAIN },
        id: Not(updateBandData.bandCaptainId!),
      },
    });

    if (existingCaptain) {
      existingCaptain.leadershipPosition = null;
      await this.memberRepository.save(existingCaptain);
    }

    const leadershipPosition =
      await this.leadershipService.findCaptainPosition();

    if (!leadershipPosition) {
      throw new NotFoundException(`Leadership Position not found`);
    }

    memberExists.leadershipPosition = leadershipPosition;
    await this.memberRepository.save(memberExists);

    bandExists.bandCaptain = memberExists;
    return this.bandRepository.save(bandExists);
  }

  async findBandMembers(bandId: number): Promise<Member[]> {
    const bandCaptain = await this.memberRepository.findOne({
      where: {
        band: { id: bandId },
        leadershipPosition: { type: LeadershipType.CAPTAIN },
      },
    });
    if (!bandCaptain) {
      const allBandMembers = await this.memberRepository.find({
        where: {
          band: { id: bandId },
        },
      });
      if (!allBandMembers) {
        throw new NotFoundException("No band members found");
      }
      return allBandMembers;
    } else
      return this.memberRepository.find({
        where: {
          id: Not(bandCaptain.id),
          band: { id: bandId },
        },
      });
  }
}
