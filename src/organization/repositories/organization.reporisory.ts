import { Injectable, Inject } from "@nestjs/common";
import { DRIZZLE_DB } from "../../database/database.module";
import type { DrizzleDB } from "../../database/drizzle.config";
import { organizations, Organization, NewOrganization } from "../../database/schema";

@Injectable()
export class OrganizationRepository {
    constructor(
        @Inject(DRIZZLE_DB)
        private readonly db: DrizzleDB
    ) { }

    async create(data: NewOrganization): Promise<Organization> {
        const result = await this.db.insert(organizations).values(data).returning();
        return result[0];
    }
}