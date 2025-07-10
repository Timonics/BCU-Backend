import { LeadershipService } from './leadership.service';
import { CreateLeadershipDto } from './dto/create_leadership.dto';
import { LeadershipPosition } from 'src/entity/leadership.entity';
export declare class LeadershpController {
    private readonly leadersipService;
    constructor(leadersipService: LeadershipService);
    createLeadership(leadershipData: CreateLeadershipDto): Promise<LeadershipPosition>;
}
