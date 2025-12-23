import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { DatabaseModule } from '../database/database.module';
import { OrganizationRepository } from './repositories/organization.reporisory';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, TenantService, OrganizationRepository],
})
export class OrganizationModule {}
