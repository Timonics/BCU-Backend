import { MemberService } from "./member.service";
import { Member } from "src/entity/member.entity";
import { CreateMemberDto } from "./dto/create_member.dto";
import { UpdateMemberDto } from "./dto/update_member.dto";
import { MemberMetaData } from "./dto/member_metadata.dto";
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    findAllMembers(page?: number, limit?: number, sortBy?: string, sortOrder?: "ASC" | "DESC"): Promise<{
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
    } | string | undefined>;
    findMember(id: number): Promise<Member | null>;
    getMembersStats(): Promise<MemberMetaData>;
    createMember(memberData: CreateMemberDto): Promise<Member>;
    updateMember(id: number, memberUpdateData: Partial<UpdateMemberDto>): Promise<Member>;
    deleteMember(id: number): Promise<{
        message: string;
    }>;
}
