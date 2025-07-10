import { Unit } from 'src/entity/unit.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create_unit.dto';
import { Member } from 'src/entity/member.entity';
import { UpdateUnitDto } from './dto/update_unit.dto';
export declare class UnitService {
    private readonly unitRepository;
    private readonly memberRepository;
    constructor(unitRepository: Repository<Unit>, memberRepository: Repository<Member>);
    findAll(): Promise<Unit[]>;
    findUnitById(id: number): Promise<Unit | null>;
    create(unitData: CreateUnitDto): Promise<Unit>;
    update(unitId: number, unitUpdateData: Partial<UpdateUnitDto>): Promise<Unit>;
}
