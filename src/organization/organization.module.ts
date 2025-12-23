import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TenantService } from 'src/tenant/tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationRepository } from './repositories/organization.reporisory';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    JwtModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, TenantService, OrganizationRepository],
})
export class OrganizationModule {}
