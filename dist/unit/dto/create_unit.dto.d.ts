import { Member } from 'src/entity/member.entity';
export declare class CreateUnitDto {
    name: string;
    foundingDate: string;
    members: Member[];
    unitHeadId?: number;
}
