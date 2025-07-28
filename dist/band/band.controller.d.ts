import { BandService } from "./band.service";
import { Band } from "src/entity/band.entity";
import { UpdateBandDto } from "./dto/update_band.dto";
import { CreateBandDto } from "./dto/create_band.dto";
import { Member } from "src/entity/member.entity";
export declare class BandController {
    private readonly bandService;
    constructor(bandService: BandService);
    findAllBands(page?: number, limit?: number, sortBy?: string, sortOrder?: "ASC" | "DESC"): Promise<{
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
    } | string>;
    findBand(id: number): Promise<Band | null>;
    createBand(bandData: CreateBandDto): Promise<Band>;
    updateBand(id: number, updateBandData: Partial<UpdateBandDto>): Promise<Band>;
    assignNewBandCaptain(bandId: number, updateBandData: Pick<UpdateBandDto, "bandCaptainId">): Promise<Band>;
    findBandMembers(bandId: number): Promise<Member[]>;
}
