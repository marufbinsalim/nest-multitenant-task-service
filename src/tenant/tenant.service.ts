import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantService {
    constructor(private readonly dataSource: DataSource) { }

    async createSchema(schemaName: string): Promise<void> {
        if (!/^[a-z_][a-z0-9_]*$/.test(schemaName)) {
            throw new Error('Invalid schema name');
        }

        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    }

    async dropSchema(schemaName: string): Promise<void> {
        if (!/^[a-z_][a-z0-9_]*$/.test(schemaName)) {
            throw new Error('Invalid schema name');
        }

        await this.dataSource.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
    }
}
