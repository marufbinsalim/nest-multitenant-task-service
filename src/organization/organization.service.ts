import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Request } from 'express';
import { OrganizationRepository } from './repositories/organization.reporisory';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.type';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepo: OrganizationRepository,
    private readonly userRolesService: UserRolesService,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto, req: AuthenticatedRequest) {
    const userId = req.user.sub;
    try {

      const createOrganizationData = {
        ...createOrganizationDto,
        owner_id: userId,
      };

      const organization = await this.organizationRepo.create(createOrganizationData);

      this.userRolesService.create({
        role_id: 1,
        user_id: userId,
        organization_id: organization.id,
      })

      return organization;
    } catch (err) {
      console.log(err);
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
}
