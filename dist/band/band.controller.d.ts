import { BandService } from './band.service';
import { Band } from 'src/entity/band.entity';
import { UpdateBandDto } from './dto/update_band.dto';
import { CreateBandDto } from './dto/create_band.dto';
export declare class BandController {
    private readonly bandService;
    constructor(bandService: BandService);
    findAllBands(): Promise<Band[] | string>;
    findBand(id: number): Promise<Band | null>;
    createBand(bandData: CreateBandDto): Promise<Band>;
    updateBand(id: number, updateBandData: Partial<UpdateBandDto>): Promise<Band>;
}
