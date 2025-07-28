import { LeadershipPosition } from "src/entity/leadership.entity";
import { Repository } from "typeorm";
import { CreateLeadershipDto } from "./dto/create_leadership.dto";
export declare class LeadershipService {
    private readonly leadershipRepository;
    constructor(leadershipRepository: Repository<LeadershipPosition>);
    create(leadershipData: CreateLeadershipDto): Promise<LeadershipPosition>;
    findLeadershipPositionById(id: number): Promise<LeadershipPosition | null>;
    findAllLeaders(): Promise<LeadershipPosition[]>;
    findCaptainPosition(): Promise<LeadershipPosition | null>;
}
