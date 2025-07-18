import { UnitService } from "./unit.service";
import { Unit } from "src/entity/unit.entity";
import { UpdateUnitDto } from "./dto/update_unit.dto";
import { CreateUnitDto } from "./dto/create_unit.dto";
export declare class UnitController {
    private readonly unitService;
    constructor(unitService: UnitService);
    findAllUnits(page?: number, limit?: number, sortBy?: string, sortOrder?: "ASC" | "DESC"): Promise<{
        units: Unit[];
        meta: {
            totalPages: number;
            currentPage: number;
            limit: number;
            totalUnits: number;
            hasPrev: boolean;
            hasNext: boolean;
        };
    } | string>;
    findUnit(id: number): Promise<Unit | null>;
    createUnit(unitData: CreateUnitDto): Promise<Unit>;
    updateUnit(id: number, updateUnitData: Partial<UpdateUnitDto>): Promise<Unit>;
}
