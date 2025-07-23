import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Unit } from "src/entity/unit.entity";
import { Not, Repository } from "typeorm";
import { CreateUnitDto } from "./dto/create_unit.dto";
import { Member } from "src/entity/member.entity";
import { UpdateUnitDto } from "./dto/update_unit.dto";

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: string = "id",
    sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<{
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
  }> {
    const queryBuilder = this.unitRepository
      .createQueryBuilder("unit")
      .leftJoinAndSelect("unit.unitHead", "unitHead")
      .leftJoinAndSelect("unitHead.band", "band")
      .leftJoinAndSelect("unit.members", "members")
      .select(["unit", "unitHead", "band.id", "band.name", "members"]);

    if (sortOrder) {
      const validSorts = ["id", "gender", "name"];

      if (validSorts.includes(sortBy)) {
        queryBuilder.orderBy(`band.${sortBy}`, sortOrder);
      }
    }

    const totalUnitLeaders = await this.unitRepository.count({
      where: {
        unitHead: Not(null),
      },
    });
    const totalUnits = await this.unitRepository.count();
    const totalPages = Math.ceil(totalUnits / limit);

    const data = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      units: data,
      meta: {
        totalPages,
        currentPage: page,
        limit,
        totalUnits,
        totalUnitLeaders,
        hasPrev: page < 1,
        hasNext: page < totalPages,
      },
    };
  }

  async findUnitById(id: number): Promise<Unit | null> {
    return this.unitRepository
      .createQueryBuilder("unit")
      .where("unit.id = :id", { id })
      .leftJoinAndSelect("unit.unitHead", "unitHead")
      .leftJoinAndSelect("unitHead.band", "band")
      .leftJoinAndSelect("unit.members", "members")
      .select(["unit", "unitHead", "band.id", "band.name", "members"])
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
          `Member with ID ${unitData.unitHeadId} not found`
        );
      unit.unitHead = unitHead;
    }

    return this.unitRepository.save(unit);
  }

  async update(unitId: number, unitUpdateData: Partial<UpdateUnitDto>) {
    const unitExists = await this.unitRepository.findOne({
      where: { id: unitId },
    });

    if (!unitExists) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    if (unitUpdateData.unitHeadId) {
      let unitCaptain = await this.memberRepository.findOne({
        where: { id: unitUpdateData.unitHeadId },
      });
      if (!unitCaptain)
        throw new NotFoundException(
          `Member with ID ${unitUpdateData.unitHeadId} not found`
        );
      if (unitCaptain.unit?.id !== unitId && unitCaptain.unit)
        throw new NotAcceptableException(
          `Member with ID ${unitUpdateData.unitHeadId} can't be assigned this unit's head, update member's details first`
        );
      if (!unitCaptain.unit) {
        this.memberRepository.update(unitCaptain.id, { unit: unitExists });
      }
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
