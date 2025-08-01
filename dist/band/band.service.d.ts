import { Band } from "src/entity/band.entity";
import { Repository } from "typeorm";
import { CreateBandDto } from "./dto/create_band.dto";
import { UpdateBandDto } from "./dto/update_band.dto";
import { Member } from "src/entity/member.entity";
import { LeadershipService } from "src/leadership/leadership.service";
export declare class BandService {
    private readonly bandRepository;
    private memberRepository;
    private leadershipService;
    private logger;
    constructor(bandRepository: Repository<Band>, memberRepository: Repository<Member>, leadershipService: LeadershipService);
    findAll(page?: number, limit?: number, sortBy?: string, sortOrder?: "ASC" | "DESC"): Promise<{
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
    }>;
    findBandById(id: number): Promise<Band | null>;
    create(bandData: CreateBandDto): Promise<Band>;
    update(bandId: number, bandUpdateData: Partial<UpdateBandDto>): Promise<Band>;
    assignNewCaptain(bandId: number, updateBandData: Pick<UpdateBandDto, "bandCaptainId">): Promise<Band>;
    findBandMembers(bandId: number): Promise<Member[]>;
}
