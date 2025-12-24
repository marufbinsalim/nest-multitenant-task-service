import { Module } from '@nestjs/common';
import { RoleService } from './services/role/role.service';
import { PermissionService } from './services/permission/permission.service';

@Module({
  providers: [RoleService, PermissionService]
})
export class RolePermissionsModule {}
