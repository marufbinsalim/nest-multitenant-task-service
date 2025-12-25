import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UserRoleRepository } from './repositories/user-role.repository';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController],
  providers: [UserRolesService, UserRoleRepository],
  exports: [UserRolesService],
})
export class UserRolesModule {}