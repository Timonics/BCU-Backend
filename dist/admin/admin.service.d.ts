import { Admin } from "src/entity/admin.entity";
import { Repository } from "typeorm";
export declare class AdminService {
    private readonly adminRepository;
    constructor(adminRepository: Repository<Admin>);
    createAdmin(adminData: Partial<Admin>): Promise<Admin>;
    findAdminByEmail(email: string): Promise<Admin | null>;
    findById(id: number): Promise<Admin | null>;
    markEmailAsVerified(email: string): Promise<import("typeorm").UpdateResult>;
}
