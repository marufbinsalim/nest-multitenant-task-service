import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '../database/database.module';
import type { DrizzleDB } from '../database/drizzle.config';
import { sql } from 'drizzle-orm';

@Injectable()
export class TenantService {
    constructor(
        @Inject(DRIZZLE_DB)
        private readonly db: DrizzleDB
    ) { }

    async createSchema(schemaName: string): Promise<void> {
        if (!/^[a-z_][a-z0-9_]*$/.test(schemaName)) {
            throw new Error('Invalid schema name');
        }

        await this.db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`));
    }

    async dropSchema(schemaName: string): Promise<void> {
        if (!/^[a-z_][a-z0-9_]*$/.test(schemaName)) {
            throw new Error('Invalid schema name');
        }

        await this.db.execute(sql.raw(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`));
    }
}
