import { InjectRepository } from "@nestjs/typeorm";
import { LeadershipPosition } from "src/entity/leadership.entity";
import { Repository } from "typeorm";
import { CreateLeadershipDto } from "./dto/create_leadership.dto";

export class LeadershipService {
  constructor(
    @InjectRepository(LeadershipPosition)
    private readonly leadershipRepository: Repository<LeadershipPosition>
  ) {}

  async create(
    leadershipData: CreateLeadershipDto
  ): Promise<LeadershipPosition> {
    const leader = this.leadershipRepository.create(leadershipData);
    return this.leadershipRepository.save(leader);
  }

  async findLeadershipPositionById(
    id: number
  ): Promise<LeadershipPosition | null> {
    return this.leadershipRepository.findOne({
      where: { id },
      relations: ["members"],
    });
  }

  async findAllLeaders() {
    return this.leadershipRepository
      .createQueryBuilder("leader")
      .leftJoinAndSelect("leader.members", "members")
      .leftJoin("members.band", "band")
      .leftJoin("members.unit", "unit")
      .loadRelationCountAndMap("leader.membersCount", "leader.members")
      .select(["leader", "band.id", "band.name", "unit.id", "unit.name"])
      .getMany();
  }
}
