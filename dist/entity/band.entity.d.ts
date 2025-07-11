import { Gender } from '../utils/enums/gender.enum';
import { Member } from './member.entity';
export declare class Band {
    id: number;
    name: string;
    gender: Gender;
    foundingDate: Date;
    members: Member[];
    bandCaptain?: Member;
}
