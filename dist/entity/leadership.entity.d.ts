import { LeadershipType } from "../utils/enums/leadership_type.enum";
import { Member } from "./member.entity";
export declare class LeadershipPosition {
    id: number;
    type: LeadershipType;
    members: Member[];
    appointedAt: Date;
}
