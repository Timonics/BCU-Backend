import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "src/entity/member.entity";
import { Not, Repository } from "typeorm";
import { CreateMemberDto } from "./dto/create_member.dto";
import { BandService } from "src/band/band.service";
import { UnitService } from "src/unit/unit.service";
import { UpdateMemberDto } from "./dto/update_member.dto";
import { MemberMetaData } from "./dto/member_metadata.dto";
import { Gender } from "src/utils/enums/gender.enum";
import { LeadershipService } from "src/leadership/leadership.service";
import { Unit } from "src/entity/unit.entity";

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly bandservice: BandService,

    // @InjectRepository(Unit)
    // private readonly unitRepository: Repository<Unit>,

    private readonly unitservice: UnitService,
    private readonly leadershipService: LeadershipService
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: string = "id",
    sortOrder: "ASC" | "DESC" = "ASC"
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
          hasPrev: boolean;
          hasNext: boolean;
        };
      }
    | undefined
  > {
    const queryBuilder = this.memberRepository
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
      ]);

    if (sortBy) {
      const validSorts = [
        "id",
        "firstName",
        "lastName",
        "email",
        "gender",
        "status",
      ];

      if (validSorts.includes(sortBy)) {
        queryBuilder.orderBy(`member.${sortBy}`, sortOrder);
      } else if (sortBy == "band") {
        queryBuilder.orderBy(`band.name`, sortOrder);
      } else if (sortBy == "unit") {
        queryBuilder.orderBy(`unit.name`, sortOrder);
      }

      const data = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      const totalPages = Math.ceil((await queryBuilder.getCount()) / limit);
      const membersMetaData = await this.memberMetaData();

      return {
        members: data,
        meta: {
          ...membersMetaData,
          totalPages,
          currentPage: page,
          limit,
          hasPrev: page > 1,
          hasNext: page < totalPages,
        },
      };
    }
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
    const memberExists = await this.memberRepository.findOne({
      where: { id },
      relations: ["band", "band.members", "leadershipPosition", "unit", "unit.unitHead"],
    });

    if (!memberExists) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    if (memberUpdateData.bandId) {
      const band = await this.bandservice.findBandById(memberUpdateData.bandId);
      if (!band)
        throw new NotFoundException(
          `Band with ID ${memberUpdateData.bandId} not found`
        );

      if (memberExists.band && memberExists.band.bandCaptain) {
        memberExists.band.bandCaptain = null;
      }
      memberExists.band = band;
    }

    if (memberUpdateData.leadershipPositionId) {
      if (!memberExists.band && !memberExists.unit) {
        throw new NotAcceptableException(
          "This member has to have belong to a band or unit before assigning leadership position"
        );
      }
      const leaderPosition =
        await this.leadershipService.findLeadershipPositionById(
          memberUpdateData.leadershipPositionId
        );
      if (!leaderPosition) {
        throw new NotFoundException(
          `Leadership Position with ID ${memberUpdateData.leadershipPositionId} not found`
        );
      }

      const existingLeader = await this.memberRepository.findOne({
        where: {
          band: { id: memberExists.band?.id },
          leadershipPosition: { id: memberUpdateData.leadershipPositionId },
          id: Not(id),
        },
      });

      if (existingLeader) {
        throw new NotAcceptableException(
          "This leadership position is already assigned to another member in the band"
        );
      }

      if (leaderPosition.type === "captain") {
        await this.bandservice.update(memberExists.band?.id!, {
          bandCaptainId: memberExists.id,
        });
      }

      memberExists.leadershipPosition = leaderPosition;
    }

    let unitToUpdate: Unit | null = null;

    if (memberUpdateData.unitId) {
      const unit = await this.unitservice.findUnitById(memberUpdateData.unitId);
      if (!unit)
        throw new NotFoundException(
          `Unit with ID ${memberUpdateData.unitId} not found`
        );

      if (
        memberExists.unit &&
        memberExists.unit.id !== unit.id &&
        memberExists.unit.unitHead?.id === memberExists.id
      ) {
        unitToUpdate = memberExists.unit;
        unitToUpdate.unitHead = null;
      }
      memberExists.unit = unit;
    }

    Object.assign(memberExists, memberUpdateData);

    return this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        if (unitToUpdate) {
          await transactionalEntityManager.save(Unit, unitToUpdate);
        }
        return await transactionalEntityManager.save(Member, memberExists);
      }
    );
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

  async findMemberByName(name: string) {
    const nameArr = name.split(" ");
    const firstName = nameArr[0];
    const lastName = nameArr.at(-1);
    return this.memberRepository.findOne({
      where: {
        firstName,
        lastName,
      },
    });
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
