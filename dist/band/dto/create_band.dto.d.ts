import { Gender } from 'src/utils/enums/gender.enum';
export declare class CreateBandDto {
    name: string;
    gender: Gender;
    foundingDate: string;
    bandCaptainId?: number;
}
