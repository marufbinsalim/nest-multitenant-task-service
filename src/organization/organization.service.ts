import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { TenantService } from 'src/tenant/tenant.service';
import { Repository } from 'typeorm';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly oragnizationRepo: Repository<Organization>,

    private readonly tenantService: TenantService
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto, req: Request) {
    const userId = req?.['user']?.sub;

    const schemaName = this.generateSchemaName(createOrganizationDto.name);

    // Create schema
    await this.tenantService.createSchema(schemaName);

    try {
      // Save organization
      const organization = await this.oragnizationRepo.save({
        ...createOrganizationDto,
        schema_name: schemaName,
        userId,
      });

      return organization;
    } catch (err) {
      // Rollback schema creation on error
      await this.tenantService.dropSchema(schemaName);
      throw err;
    }
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }

  private generateSchemaName(name: string): string {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_{2,}/g, '_');

    const suffix = Math.random().toString(36).substring(2, 8);

    return `org_${base}_${suffix}`;
  }
}
