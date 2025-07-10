import { Band } from 'src/entity/band.entity';
import { Repository } from 'typeorm';
import { CreateBandDto } from './dto/create_band.dto';
import { UpdateBandDto } from './dto/update_band.dto';
import { Member } from 'src/entity/member.entity';
export declare class BandService {
    private readonly bandRepository;
    private memberRepository;
    constructor(bandRepository: Repository<Band>, memberRepository: Repository<Member>);
    findAll(): Promise<Band[]>;
    findBandById(id: number): Promise<Band | null>;
    create(bandData: CreateBandDto): Promise<Band>;
    update(bandId: number, bandUpdateData: Partial<UpdateBandDto>): Promise<Band>;
}
