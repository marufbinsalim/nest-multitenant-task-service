import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleRepository } from './repositories/user-role.repository';

@Injectable()
export class UserRolesService {
  constructor(private readonly userRoleRepo: UserRoleRepository) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<any> {
    try {
      const userRole = await this.userRoleRepo.create(createUserRoleDto);
      return userRole;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll(): Promise<any[]> {
    return this.userRoleRepo.findAll();
  }

  async findOne(id: number): Promise<any> {
    return this.userRoleRepo.findOne(id);
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<any> {
    return this.userRoleRepo.update(id, updateUserRoleDto);
  }

  async remove(id: number): Promise<void> {
    return this.userRoleRepo.remove(id);
  }
}