import { Member } from './member.entity';
export declare class Unit {
    id: number;
    name: string;
    foundingDate: Date;
    unitHead?: Member | null;
    members: Member[];
}
