import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "../entities/organization.entity";
import { Repository } from "typeorm";

export class OrganizationRepository {
    constructor(@InjectRepository(Organization) private readonly organizationRepo: Repository<Organization>) { }

    async create(data: Partial<Organization>) {
        return this.organizationRepo.save(data);
    }
}