import { Member } from "src/entity/member.entity";
import { Repository } from "typeorm";
import { CreateMemberDto } from "./dto/create_member.dto";
import { BandService } from "src/band/band.service";
import { UnitService } from "src/unit/unit.service";
import { UpdateMemberDto } from "./dto/update_member.dto";
import { MemberMetaData } from "./dto/member_metadata.dto";
import { LeadershipService } from "src/leadership/leadership.service";
export declare class MemberService {
    private readonly memberRepository;
    private readonly bandservice;
    private readonly unitservice;
    private readonly leadershipService;
    private readonly logger;
    constructor(memberRepository: Repository<Member>, bandservice: BandService, unitservice: UnitService, leadershipService: LeadershipService);
    findAll(page?: number, limit?: number, sortBy?: string, sortOrder?: "ASC" | "DESC"): Promise<{
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
    } | undefined>;
    findOneById(id: number): Promise<Member | null>;
    findOneByEmail(email: string): Promise<Member | null>;
    create(memberData: CreateMemberDto): Promise<Member>;
    update(id: number, memberUpdateData: Partial<UpdateMemberDto>): Promise<Member>;
    delete(memberId: number): Promise<void>;
    totalMembers(): Promise<number>;
    totalMale(): Promise<number>;
    totalFemale(): Promise<number>;
    memberMetaData(): Promise<MemberMetaData>;
}
