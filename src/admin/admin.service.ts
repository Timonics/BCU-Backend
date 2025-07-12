import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/entity/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>
  ) {}

  async createAdmin(adminData: Partial<Admin>): Promise<Admin> {
    const admin = this.adminRepository.create(adminData);
    return this.adminRepository.save(admin);
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  async markEmailAsVerified(email: string) {
    return this.adminRepository.update({ email }, { isVerified: true });
  }
}
