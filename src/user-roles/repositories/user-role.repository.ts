import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserRoleRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

  async create(data: Partial<UserRole>): Promise<UserRole> {
    const userRole = this.userRoleRepo.create(data);
    return this.userRoleRepo.save(userRole);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepo.find({
      relations: ['user', 'organization', 'role'],
    });
  }

  async findOne(id: number): Promise<UserRole | null> {
    return this.userRoleRepo.findOne({
      where: { id },
      relations: ['user', 'organization', 'role'],
    });
  }

  async update(id: number, data: Partial<UserRole>): Promise<UserRole | null> {
    await this.userRoleRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRoleRepo.delete(id);
  }
}