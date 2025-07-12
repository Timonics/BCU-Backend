import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "src/entity/member.entity";
import { Repository } from "typeorm";
import { CreateMemberDto } from "./dto/create_member.dto";
import { BandService } from "src/band/band.service";
import { UnitService } from "src/unit/unit.service";
import { UpdateMemberDto } from "./dto/update_member.dto";
import { MemberMetaData } from "./dto/member_metadata.dto";
import { Gender } from "src/utils/enums/gender.enum";
import { LeadershipService } from "src/leadership/leadership.service";

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly bandservice: BandService,
    private readonly unitservice: UnitService,
    private readonly leadershipService: LeadershipService
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository
      .createQueryBuilder("member")
      .leftJoinAndSelect("member.band", "band")
      .leftJoin("band.bandCaptain", "bandCaptain")
      .leftJoinAndSelect("member.unit", "unit")
      .leftJoinAndSelect("member.leadershipPosition", "leadershipPosition")
      .select([
        "member",
        "band.id",
        "band.name",
        "bandCaptain.id",
        "bandCaptain.firstName",
        "bandCaptain.lastName",
        "bandCaptain.otherNames",
        "unit.id",
        "unit.name",
        "leadershipPosition",
      ])
      .getMany();
  }

  async findOneById(id: number): Promise<Member | null> {
    return this.memberRepository
      .createQueryBuilder("member")
      .where("member.id = :id", { id })
      .leftJoinAndSelect("member.band", "band")
      .leftJoinAndSelect("member.unit", "unit")
      .getOne();
  }

  async findOneByEmail(email: string): Promise<Member | null> {
    return this.memberRepository.findOne({ where: { email } });
  }

  async create(memberData: CreateMemberDto): Promise<Member> {
    let member = this.memberRepository.create(memberData);

    if (memberData.bandId) {
      const band = await this.bandservice.findBandById(memberData.bandId);
      if (!band)
        throw new NotFoundException(
          `Band with ID ${memberData.bandId} not found`
        );

      member.band = band;
    }

    if (memberData.unitId) {
      const unit = await this.unitservice.findUnitById(memberData.unitId);
      if (!unit) {
        throw new NotFoundException(
          `Unit with ID ${memberData.unitId} not found`
        );
      }

      member.unit = unit;
    }

    if (memberData.leadershipPositionId) {
      const leader = await this.leadershipService.findLeadershipPositionById(
        memberData.leadershipPositionId
      );
      if (!leader) {
        throw new NotFoundException(
          `Leadership Position with ID ${memberData.leadershipPositionId} not found`
        );
      }

      member.leadershipPosition = leader;
    }

    return this.memberRepository.save(member);
  }

  async update(
    id: number,
    memberUpdateData: Partial<UpdateMemberDto>
  ): Promise<Member> {
    let memberExists = await this.memberRepository.findOne({ where: { id } });

    if (!memberExists) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    if (memberUpdateData.bandId) {
      const band = await this.bandservice.findBandById(memberUpdateData.bandId);
      if (!band)
        throw new NotFoundException(
          `Band with ID ${memberUpdateData.bandId} not found`
        );

      memberExists.band = band;
    }

    if (memberUpdateData.unitId) {
      const unit = await this.unitservice.findUnitById(memberUpdateData.unitId);
      if (!unit)
        throw new NotFoundException(
          `Unit with ID ${memberUpdateData.unitId} not found`
        );

      memberExists.unit = unit;
    }

    if (memberUpdateData.leadershipPositionId) {
      const leader = await this.leadershipService.findLeadershipPositionById(
        memberUpdateData.leadershipPositionId
      );
      if (!leader) {
        throw new NotFoundException(
          `Leadership Position with ID ${memberUpdateData.leadershipPositionId} not found`
        );
      }

      memberExists.leadershipPosition = leader;
    }

    Object.keys(memberUpdateData).forEach((key) => {
      if (
        memberUpdateData[key] !== undefined &&
        memberUpdateData[key] !== null
      ) {
        memberExists[key] = memberUpdateData[key];
      }
    });

    return this.memberRepository.save(memberExists);
  }

  async delete(memberId: number) {
    const result = await this.memberRepository.delete(memberId);
    if (result.affected === 0) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }
  }

  async totalMembers(): Promise<number> {
    try {
      return this.memberRepository.count();
    } catch (err) {
      this.logger.error("Failed to count members", err.stack);
      return 0;
    }
  }

  async totalMale(): Promise<number> {
    try {
      return this.memberRepository.count({
        where: { gender: Gender.MALE },
      });
    } catch (err) {
      this.logger.error("Failed to count members", err.stack);
      return 0;
    }
  }

  async totalFemale(): Promise<number> {
    try {
      return this.memberRepository.count({
        where: { gender: Gender.FEMALE },
      });
    } catch (err) {
      this.logger.error("Failed to count members", err.stack);
      return 0;
    }
  }

  async memberMetaData(): Promise<MemberMetaData> {
    const [totalMembers, totalMaleMembers, totalFemaleMembers] =
      await Promise.all([
        this.totalMembers(),
        this.totalMale(),
        this.totalFemale(),
      ]);

    return {
      totalMembers,
      totalMaleMembers,
      totalFemaleMembers,
    };
  }
}
